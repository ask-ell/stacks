import { Entity, type IResult, ok } from "@ask-ell/core";
import { type INestApplication } from "@nestjs/common";
import {
  DocumentBuilder,
  type OpenAPIObject,
  SwaggerModule,
} from "@nestjs/swagger";

import { ISwaggerAddOnState } from "./swagger.add-on.state.interface";
import { ISwaggerAddOn } from "./swagger.add-on.interface";
import { AuthMethod } from "./types";


export class SwaggerAddon<T>
  extends Entity<ISwaggerAddOnState>
  implements ISwaggerAddOn<T>
{
  checkStateValidity(_newState: ISwaggerAddOnState): IResult<void> {
    return ok();
  }

  apply(application: INestApplication<T>): void {
    const { title, auths } = this.getSnapshot();

    const documentBuilder: DocumentBuilder = new DocumentBuilder().setTitle(title)

    auths?.forEach((auth: AuthMethod): void => {
      if (auth === 'bearer') {
        documentBuilder.addBearerAuth();
      }
    });

    const documentBuild: Omit<OpenAPIObject, "paths"> = documentBuilder.build();

    const documentFactory = (): OpenAPIObject =>
      SwaggerModule.createDocument(application, documentBuild);

    SwaggerModule.setup("/swagger", application, documentFactory, {
      customSiteTitle: title,
      jsonDocumentUrl: "/swagger/json",
    });
  }
}