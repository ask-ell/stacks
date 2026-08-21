import { createNestApplication } from '@ask-ell/back-end';
import { IServerProvider } from '@ask-ell/node';

import { AppModule } from '../nest';
import { providers } from './providers';

export const createApplication = (): Promise<IServerProvider> =>
  createNestApplication({
    addons: {
      swagger: {
        title: 'Blog example API',
      },
    },
    module: AppModule.withProviders(providers),
  });
