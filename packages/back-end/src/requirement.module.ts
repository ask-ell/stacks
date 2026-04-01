import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import type { ILogger } from "@ask-ell/core";
import { askDockerSecretsFactory, askLocalSecretsFactory } from "@ask-ell/ask";
import { NestLogger, HealthModule, ResponseFormatInterceptor, HttpExceptionFilter } from "@ask-ell/nest";

import { KeyvStoreAdapterFactory } from "./keyv.store.adapter.factory";


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
        KeyvStoreAdapterFactory,
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