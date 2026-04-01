import { init } from "@sentry/react";
import { SentryConfiguration, SentryConfigurationProps } from "@ask-ell/sentry";

import { environment } from "./environment";


type ReactSentryConfigurationProps = Omit<SentryConfigurationProps, "environment" | "logger" | "init">;

export class ReactSentryConfiguration extends SentryConfiguration {
    constructor(props: ReactSentryConfigurationProps) {
        super({
            ...props,
            init,
            logger: console,
            environment,
        })
    }
}
