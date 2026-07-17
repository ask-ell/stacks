import { PercentageIncrementor } from '@ask-ell/core';
import { Client, QueryResult } from 'pg';
import { confirm } from '@topcli/prompts';
import { Script, ExecuteOptions } from '@ask-ell/node';


type KeyvRowData = {
    key: string;
    value: any;
}

export class MoveKeyvDataScript extends Script {
    constructor() {
        super({
            arguments: [
                { name: 'origin', description: 'Origin Postgres database URI', required: true },
                { name: 'target', description: 'Target Postgres database URI', required: true }
            ]
        });
    }

    async execute({ arguments: { origin, target } }: ExecuteOptions): Promise<void> {
        const originPostgresClient: Client = new Client(origin);
        const targetPostgresClient: Client = new Client(target);

        console.log('Reading databases...');

        await Promise.all([
            originPostgresClient.connect(),
            targetPostgresClient.connect()
        ]);

        try {
            const { rows }: QueryResult<KeyvRowData> = await originPostgresClient.query('SELECT * FROM keyv');

            const rowsCount: number = rows.length;
            console.log(`You're going to insert ${rowsCount} keyv entries from the original database to the target database.`);

            const confirmed: boolean = await confirm('Are you sure you want to proceed?');

            if (confirmed) {
                console.log('Inserting entries into the target database...');
                const incrementor: PercentageIncrementor = new PercentageIncrementor(rowsCount);
                incrementor.onIncrement(({ achivmentOnPercent }): void => {
                    console.log(`Progress: ${achivmentOnPercent}%`);
                });

                for (const { key, value } of rows) {
                    await targetPostgresClient.query('INSERT INTO keyv (key, value) VALUES ($1, $2)', [key, value]);
                    incrementor.increment();
                }

                console.log(`${rowsCount} entries inserted into the target database.`);
                console.log('Migration completed successfully.');
            } else {
                console.log('Migration cancelled.');
            }
        } finally {
            await originPostgresClient.end();
            await targetPostgresClient.end();
            console.log('Database connections closed.');
        }
    }
}
