import { IServerProvider } from '@ask-ell/node';
import { createNestApplication } from '../nest';
import { providers } from './providers';


export const createApplication = (): Promise<IServerProvider> => createNestApplication(providers)

export * from './full-stack.unit-of-work';
