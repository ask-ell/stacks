import type { ILogger, MaybeUndefined } from "@ask-ell/core";
import { Client } from "@sentry/core";


type SentryClientFactoryParams = {
    dsn: string;
    sendDefaultPii: boolean;
    environment?: string;
};

export type SentryConfigurationProps<SentryClientFactory extends (params: SentryClientFactoryParams) => MaybeUndefined<Client>> = {
    publicKey: string;
    host: string;
    projectId: string;
    logger: ILogger;
    init: SentryClientFactory;
    environment?: MaybeUndefined<string>;
};

export class SentryConfiguration<SentryClientFactory extends (params: SentryClientFactoryParams) => MaybeUndefined<Client>> {
    private client: MaybeUndefined<Client>;
    private logger: ILogger;

    constructor(private props: SentryConfigurationProps<SentryClientFactory>) {
        this.logger = this.props.logger;
    }

    init(): void {
        if (this.client) {
            return this.logger.info("Sentry already inited. Step skipped");
        }

        const { publicKey, host, projectId, environment, init } = this.props;
        const dsn = `https://${publicKey}@${host}/${projectId}`;

        this.client = init({
            dsn,
            sendDefaultPii: true,
            environment: environment ?? "production"
        });

        if (!this.client) {
            this.logger.warn(`Sentry not inited`);
            return;
        }

        this.logger.info(`Sentry inited for environment "${environment}"`);
    }
}
