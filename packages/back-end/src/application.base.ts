import { DynamicModule, Provider, Module } from "@nestjs/common";

import { RequirementModule } from "./requirement.module";


@Module({
    imports: [RequirementModule],
})
export class ApplicationBase {
    static withProviders(providers: Provider[]): DynamicModule {
        const providersAndExports: Provider[] = [...providers];
        return {
            module: this,
            providers: providersAndExports,
            exports: [...providersAndExports]
        }
    }
}