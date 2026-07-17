import { ILogger } from "@ask-ell/core";
import { Command } from "commander";
import { NestLogger } from "@ask-ell/nest";


// TODO: move to @ask-ell/node

type ScriptArgument = {
    name: string;
    description: string;
    required?: boolean;
}

type ScriptParams = {
    arguments: ScriptArgument[];
}

export type ExecuteOptions = {
    arguments: Record<string, string>;
}

export abstract class Script extends Command {
    private logger: ILogger = NestLogger.fromClass(this.constructor);

    constructor(private params: ScriptParams) {
        super();
        params.arguments.forEach((argument: ScriptArgument): void => this.setArgument(argument));
    }

    abstract execute(options: ExecuteOptions): Promise<void>;

    run(): void {
        this.parse(process.argv);
        const args: string[] = this.args;
        const executeOptions: ExecuteOptions = {
            arguments: {}
        };

        this.params.arguments.forEach((argument: ScriptArgument, index: number): void => {
            const argumentValue: string | undefined = args[index];
            if (argument.required && argumentValue === undefined) {
                throw new Error(`Missing required argument: ${argument.name}`);
            }
            executeOptions.arguments[argument.name] = argumentValue;
        });

        this.execute(executeOptions)
            .then((): void => process.exit())
            .catch(this.logger.error.bind(this.logger));
    }

    private setArgument(argument: ScriptArgument): void {
        const name: string = argument.required ? `<${argument.name}>` : `[${argument.name}]`;
        this.argument(name, argument.description);
    }
}
