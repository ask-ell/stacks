import { DynamicModule, Provider } from '@nestjs/common';

export class DynamicModuleFactory {
  static withProviders(providers: Provider[]): DynamicModule {
    const providersAndExports: Provider[] = [...providers];
    return {
      module: this,
      providers: providersAndExports,
      exports: providersAndExports,
    };
  }
}
