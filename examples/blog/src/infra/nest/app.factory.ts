import { Provider } from "@nestjs/common";
import { IServerProvider } from "@ask-ell/node";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";


export const createNestApplication = (providers: Provider[]): Promise<IServerProvider> => NestFactory.create(AppModule.withProviders(providers));
