import { createNestApplication } from '@ask-ell/back-end';
import { IServerProvider } from '@ask-ell/node';

import { AppModule } from '../nest';
import { providers } from './providers';

export const createApplication = (): Promise<IServerProvider> =>
  createNestApplication({
    module: AppModule.withProviders(providers),
    addons: {
      swagger: {
        title: 'Blog example API',
      },
    },
  });
