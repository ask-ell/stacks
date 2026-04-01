import { INestApplication } from "@nestjs/common";

import { IAddOn } from "./add-on.interface";
import { SecurityAddOn } from "./implementations/security/security.add-on";
import { AddOnWrapperParams } from "./types";
import { SwaggerAddon } from "./implementations/swagger/swagger.add-on";
import { SentryAddon } from "./implementations/sentry/sentry.add-on";


export class AddOnWrapper<T> implements IAddOn<T> {
    private implementations: IAddOn<T>[] = [
        new SecurityAddOn()
    ];

    constructor(
        private params: AddOnWrapperParams
    ) {
        this.appendImplementations();
    }

    apply(application: INestApplication<T>): void {
        this.implementations.forEach((addOn: IAddOn<T>): void => {
            addOn.apply(application);
        });
    }

    private appendImplementations(): void {
        const { sentry, swagger } = this.params;
        if(swagger){
            this.implementations.push(new SwaggerAddon(swagger));
        }
        if(sentry){
            this.implementations.push(new SentryAddon(sentry));
        }
    }
}