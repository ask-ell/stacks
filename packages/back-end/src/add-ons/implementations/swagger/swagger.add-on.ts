import {
  Entity,
  ILogger,
  type IResult,
  isOnDevelopmentMode,
  ok,
} from '@ask-ell/core';
import { NestLogger } from '@ask-ell/nest';
import { type INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  type OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';

import { ISwaggerAddOnState } from './swagger.add-on.state.interface';
import { ISwaggerAddOn } from './swagger.add-on.interface';
import { AuthMethod } from './types';

export class SwaggerAddon<T>
  extends Entity<ISwaggerAddOnState>
  implements ISwaggerAddOn<T>
{
  private logger: ILogger = NestLogger.fromClass(SwaggerAddon);

  checkStateValidity(): IResult<void> {
    return ok();
  }

  apply(application: INestApplication<T>): void {
    const { title, auths, enabledInProduction } = this.getSnapshot();

    if (!enabledInProduction && !isOnDevelopmentMode()) {
      return;
    }

    const documentBuilder: DocumentBuilder = new DocumentBuilder().setTitle(
      title
    );

    auths?.forEach((auth: AuthMethod): void => {
      if (auth === 'bearer') {
        documentBuilder.addBearerAuth();
      }
    });

    const documentBuild: Omit<OpenAPIObject, 'paths'> = documentBuilder.build();

    const documentFactory = (): OpenAPIObject =>
      SwaggerModule.createDocument(application, documentBuild);

    SwaggerModule.setup('/swagger', application, documentFactory, {
      customSiteTitle: title,
      jsonDocumentUrl: '/swagger/json',
    });

    this.logger.log('Swagger initialized');
  }
}
