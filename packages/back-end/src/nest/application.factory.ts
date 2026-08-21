import { ConsoleLogger, DynamicModule, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IServerProvider } from '@ask-ell/node';

import { AddOnWrapper, AddOnWrapperParams } from './add-ons';

type NestApplicationFactoryParams = {
  addons: AddOnWrapperParams;
  module: DynamicModule;
};

export async function createNestApplication({
  module,
  addons: addonsParams,
}: NestApplicationFactoryParams): Promise<IServerProvider> {
  const application: INestApplication = await NestFactory.create(module, {
    logger: new ConsoleLogger({
      json: true,
    }),
  });
  new AddOnWrapper(addonsParams).apply(application);
  return application;
}
