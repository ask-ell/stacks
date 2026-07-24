import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import type { ILogger } from "@ask-ell/core";
import { NestLogger, HealthModule, ResponseFormatInterceptor, HttpExceptionFilter } from "@ask-ell/nest";
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';

import { KeyvStoreAdapterFactory } from "./keyv.store.adapter.factory";
import { dockerSecretGetter, localSecretGetter } from "./secrets";


const configModuleLogger: ILogger = NestLogger.fromClass(ConfigModule);

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
                dockerSecretGetter(configModuleLogger),
                localSecretGetter(configModuleLogger)
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