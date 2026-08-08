import { IServerProvider } from "@ask-ell/node";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";


export const createApplication = (): Promise<IServerProvider> => NestFactory.create(AppModule);
