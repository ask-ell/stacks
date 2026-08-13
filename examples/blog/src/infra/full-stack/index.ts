import { IServerProvider } from '@ask-ell/node';
import { createNestApplication } from '@ask-ell/back-end';

import { providers } from './providers';
import { AppModule } from '../nest';

export const createApplication = (): Promise<IServerProvider> =>
  createNestApplication({
    params: {
      swagger: {
        title: 'Blog example API',
      },
    },
    module: AppModule.withProviders(providers),
  });

export * from './full-stack.unit-of-work';
