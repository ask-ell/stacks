import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import type { ILogger } from "@ask-ell/core";
import { askDockerSecretsFactory, askLocalSecretsFactory } from "@ask-ell/ask";
import { NestLogger, HealthModule, ResponseFormatInterceptor, HttpExceptionFilter } from "@ask-ell/nest";
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';

import { KeyvStoreAdapterFactory } from "./keyv.store.adapter.factory";


const logger: ILogger = new NestLogger("Requirements");

@Global()
@Module({
    imports: [
        HealthModule,
        SentryModule.forRoot(),
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 30,
        }]),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                askDockerSecretsFactory(logger),
                askLocalSecretsFactory(logger)
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
        },
        {
            provide: APP_FILTER,
            useClass: SentryGlobalFilter
        }
    ],
    exports: [
        ConfigModule,
        SentryModule,
        KeyvStoreAdapterFactory
    ]
})
export class RequirementModule { }