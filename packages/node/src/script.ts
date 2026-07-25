import { ILogger } from "@ask-ell/core";
import { confirm } from '@topcli/prompts';
import { Command } from "commander";


type ScriptArgument = {
    name: string;
    description?: string;
    required?: boolean;
}

export type ScriptParams = {
    logger: ILogger;
    arguments?: ScriptArgument[];
}

type PromptTools = {
    confirm: (message: string) => Promise<boolean>;
}

export type ExecuteOptions = {
    arguments: Record<string, string>;
    logger: ILogger;
    prompts: PromptTools;
}

export abstract class Script extends Command {
    constructor(private params: ScriptParams) {
        super();
        params.arguments?.forEach((argument: ScriptArgument): void => this.setArgument(argument));
    }

    abstract execute(options: ExecuteOptions): Promise<void>;

    run(): void {
        this.parse(process.argv);
        const args: string[] = this.args;
        const executeOptions: ExecuteOptions = {
            arguments: {},
            logger: this.params.logger,
            prompts: {
                confirm
            }
        };

        this.params.arguments?.forEach((argument: ScriptArgument, index: number): void => {
            const argumentValue: string | undefined = args[index];
            if (argument.required && argumentValue === undefined) {
                throw new Error(`Missing required argument: ${argument.name}`);
            }
            executeOptions.arguments[argument.name] = argumentValue;
        });

        this.execute(executeOptions)
            .then((): void => process.exit())
            .catch(this.params.logger.error.bind(this.params.logger));
    }

    private setArgument(argument: ScriptArgument): void {
        const name: string = argument.required ? `<${argument.name}>` : `[${argument.name}]`;
        this.argument(name, argument.description);
    }
}
