import type { ILogger, MaybeUndefined } from "@ask-ell/core";
import type { Client, Options } from "@sentry/core"


type SentryClientFactory = (options: Options) => MaybeUndefined<Client>;

export type SentryConfigurationProps = {
    publicKey: string;
    host: string;
    projectId: string;
    environment?: MaybeUndefined<string>;
    logger: ILogger;
    init: SentryClientFactory;
};

export class SentryConfiguration {
    private inited = false;
    private logger: ILogger;

    constructor(private props: SentryConfigurationProps) {
        this.logger = this.props.logger;
    }

    init(): void {
        if(this.inited){
            return this.logger.info("Sentry already inited. Step skipped");
        }

        const { publicKey, host, projectId, environment, init } = this.props;
        const dsn: string = `https://${publicKey}@${host}/${projectId}`;

        const client: MaybeUndefined<Client> = init({
            dsn,
            sendDefaultPii: true,
            environment: environment ?? "production"
        });

        if(!client){
            this.logger.warn(`Sentry not inited`);
            return;
        }

        this.logger.info(`Sentry inited for environment "${environment}"`);
        this.inited = true;
    }
}
