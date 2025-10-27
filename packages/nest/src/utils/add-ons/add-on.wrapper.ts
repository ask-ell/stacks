import { INestApplication } from "@nestjs/common";

import { IAddOn } from "./add-on.interface";
import { SwaggerAddon } from "./implementations/swagger/swagger.add-on";
import { SecurityAddOn } from "./implementations/security/security.add-on";
import { AddOnWrapperParams } from "./types";


export class AddOnWrapper<T> implements IAddOn<T> {
    private implementations: IAddOn<T>[];

    constructor(
        private params: AddOnWrapperParams
    ) {
        this.implementations = [
        new SwaggerAddon(this.params.swagger),
        new SecurityAddOn()
    ];
    }

    apply(application: INestApplication<T>): void {
        this.implementations.forEach((addOn: IAddOn<T>): void => {
            addOn.apply(application);
        });
    }
}