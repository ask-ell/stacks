import { ILogger } from '@ask-ell/core';
import { confirm } from '@topcli/prompts';
import { Command } from 'commander';

export type ProgramArgument = {
  name: string;
  description?: string;
  required?: boolean;
};

export type ProgramParams = {
  logger: ILogger;
  arguments?: ProgramArgument[];
};

export type PromptTools = {
  confirm: (message: string) => Promise<boolean>;
};

export type ProgramExecutionOptions = {
  arguments: Record<string, string>;
  logger: ILogger;
  prompts: PromptTools;
};

export abstract class Program extends Command {
  constructor(private params: ProgramParams) {
    super();
    params.arguments?.forEach((argument: ProgramArgument): void =>
      this.setArgument(argument)
    );
  }

  abstract execute(options: ProgramExecutionOptions): Promise<void>;

  run(): void {
    this.parse(process.argv);
    const args: string[] = this.args;
    const executeOptions: ProgramExecutionOptions = {
      arguments: {},
      logger: this.params.logger,
      prompts: {
        confirm,
      },
    };

    this.params.arguments?.forEach(
      (argument: ProgramArgument, index: number): void => {
        const argumentValue: string | undefined = args[index];
        if (argument.required && argumentValue === undefined) {
          throw new Error(`Missing required argument: ${argument.name}`);
        }
        executeOptions.arguments[argument.name] = argumentValue;
      }
    );

    this.execute(executeOptions)
      .then((): void => process.exit())
      .catch(this.params.logger.error.bind(this.params.logger));
  }

  private setArgument(argument: ProgramArgument): void {
    const name: string = argument.required
      ? `<${argument.name}>`
      : `[${argument.name}]`;
    this.argument(name, argument.description);
  }
}
