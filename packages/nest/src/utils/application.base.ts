import { DynamicModule, Provider } from "@nestjs/common";

import { RequirementModule } from "../modules";

export class ApplicationBase {
    static withProviders(providers: Provider[]): DynamicModule {
        const providersAndExports: Provider[] = [...providers];
        return {
            module: this,
            imports: [RequirementModule],
            providers: providersAndExports,
            exports: [...providersAndExports]
        }
    }
}