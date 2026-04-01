import { init } from "@sentry/nestjs";
import { SentryConfiguration, SentryConfigurationProps } from "@ask-ell/sentry";

import { NestLogger } from "./utils";


type NestSentryConfigurationProps = Omit<SentryConfigurationProps, "environment" | "logger" | "init">;

export class NestSentryConfiguration extends SentryConfiguration {
    constructor(props: NestSentryConfigurationProps) {
        super({
            ...props,
            init,
            logger: NestLogger.fromClass(NestSentryConfiguration),
            environment: process.env["NODE_ENV"],
        })
    }
}