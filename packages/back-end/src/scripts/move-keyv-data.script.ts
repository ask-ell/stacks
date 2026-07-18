import { PercentageIncrementor } from '@ask-ell/core';
import { Client, QueryResult } from 'pg';
import { Script, ExecuteOptions } from '@ask-ell/node';
import { NestLogger } from '@ask-ell/nest';


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
            ],
            logger: NestLogger.fromClass(MoveKeyvDataScript)
        });
    }

    async execute({ logger, arguments: { origin, target }, prompts: { confirm } }: ExecuteOptions): Promise<void> {
        const originPostgresClient: Client = new Client(origin);
        const targetPostgresClient: Client = new Client(target);

        logger.log('Reading databases...');

        await Promise.all([
            originPostgresClient.connect(),
            targetPostgresClient.connect()
        ]);

        try {
            const { rows }: QueryResult<KeyvRowData> = await originPostgresClient.query('SELECT * FROM keyv');

            const rowsCount: number = rows.length;
            logger.log(`You're going to insert ${rowsCount} keyv entries from the original database to the target database.`);

            const confirmed: boolean = await confirm('Are you sure you want to proceed?');

            if (confirmed) {
                logger.log('Inserting entries into the target database...');
                const incrementor: PercentageIncrementor = new PercentageIncrementor(rowsCount);
                incrementor.onIncrement(({ achivmentOnPercent }): void => {
                    logger.log(`Progress: ${achivmentOnPercent}%`);
                });

                for (const { key, value } of rows) {
                    await targetPostgresClient.query('INSERT INTO keyv (key, value) VALUES ($1, $2)', [key, value]);
                    incrementor.increment();
                }

                logger.log(`${rowsCount} entries inserted into the target database.`);
                logger.log('Migration completed successfully.');
            } else {
                logger.log('Migration cancelled.');
            }
        } finally {
            await Promise.all([
                originPostgresClient.end(),
                targetPostgresClient.end()
            ]);
            logger.log('Database connections closed.');
        }
    }
}
