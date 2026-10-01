import { DynamicModule, Provider } from '@nestjs/common';

import { CoreModule } from './modules';

export class DynamicModuleFactory {
  static withProviders(providers: Provider[]): DynamicModule {
    const providersAndExports: Provider[] = [...providers];
    return {
      module: this,
      global: true,
      imports: [CoreModule],
      providers: providersAndExports,
      exports: providersAndExports,
    };
  }
}
