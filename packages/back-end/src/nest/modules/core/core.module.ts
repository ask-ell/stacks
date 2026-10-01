import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { ILogger } from '@ask-ell/core';
import { NestLogger } from '@ask-ell/nest';

import { HealthModule } from '../health';
import { ResponseFormatInterceptor } from '../../interceptors';
import { HttpExceptionFilter } from '../../filters';
import { dockerSecretGetter, localSecretGetter } from '../../../secrets';
import { KeyvStoreAdapterFactory } from '../../../keyv';

const configModuleLogger: ILogger = NestLogger.fromClass(ConfigModule);

@Module({
  imports: [
    HealthModule,
    SentryModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        dockerSecretGetter(configModuleLogger),
        localSecretGetter(configModuleLogger),
      ],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
    {
      provide: KeyvStoreAdapterFactory,
      useClass: KeyvStoreAdapterFactory,
    },
  ],
  exports: [KeyvStoreAdapterFactory],
})
export class CoreModule {}
