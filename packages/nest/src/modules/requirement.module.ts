import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import type { ILogger } from "@ask-ell/core";
import { askDockerSecretsFactory, askLocalSecretsFactory } from "@ask-ell/ask";

import { HealthModule } from "./health";
import { ResponseFormatInterceptor } from "../interceptors";
import { HttpExceptionFilter } from "../filters";
import { NestLogger } from "../utils";

const configurationLogger: ILogger = new NestLogger("Configuration");

@Global()
@Module({
    imports: [
        HealthModule,
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 30,
        }]),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                askDockerSecretsFactory(configurationLogger),
                askLocalSecretsFactory(configurationLogger)
            ]
        })
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseFormatInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ],
    exports: [
        ConfigModule
    ]
})
export class RequirementModule { }