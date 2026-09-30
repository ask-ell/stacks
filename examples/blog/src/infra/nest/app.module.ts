import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoreModule, DynamicModuleFactory } from '@ask-ell/back-end';

import { ArticleModule } from './modules';
import { ApplicationErrorInterceptor } from './interceptors';

@Global()
@Module({
  imports: [ArticleModule, CoreModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApplicationErrorInterceptor,
    },
  ],
})
export class AppModule extends DynamicModuleFactory {}
