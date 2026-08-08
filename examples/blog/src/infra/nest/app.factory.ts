import { Provider } from "@nestjs/common";
import { IServerProvider } from "@ask-ell/node";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { AddOnWrapper } from "@ask-ell/back-end";


export async function createNestApplication(providers: Provider[]): Promise<IServerProvider> {
    const application = await NestFactory.create(AppModule.withProviders(providers));
    new AddOnWrapper({
        swagger: {
            title: 'Blog example API'
        }
    }).apply(application);
    return application;
}
