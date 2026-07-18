import { ConsoleLogger, ILogger } from "@ask-ell/core";
import { SentryClientFactory, SentryConfiguration, SentryConfigurationProps } from "@ask-ell/sentry";
import { init } from "@sentry/react";

import { environment } from "./environment";


type ReactSentryConfigurationProps = Omit<SentryConfigurationProps, "environment" | "logger" | "init"> & { logger?: ILogger };

export class ReactSentryConfiguration extends SentryConfiguration {
    constructor(props: ReactSentryConfigurationProps) {
        super({
            ...props,
            init: init as SentryClientFactory, // TODO: update @sentry/core as same version
            environment,
            logger: props.logger ?? new ConsoleLogger(),
        })
    }
}
