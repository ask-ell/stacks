import { init } from "@sentry/nestjs";
import { SentryClientFactory, SentryConfiguration, SentryConfigurationProps } from "@ask-ell/sentry";

import { NestLogger } from "./utils";


type NestSentryConfigurationProps = Omit<SentryConfigurationProps, "environment" | "logger" | "init">;

export class NestSentryConfiguration extends SentryConfiguration {
    constructor(props: NestSentryConfigurationProps) {
        super({
            ...props,
            init: init as SentryClientFactory, // TODO: update @sentry/core as same version
            logger: NestLogger.fromClass(NestSentryConfiguration),
            environment: process.env["NODE_ENV"],
        })
    }
}