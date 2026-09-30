import { ConsoleLogger, INestApplication } from '@nestjs/common';
import { IEntryNestModule, NestFactory } from '@nestjs/core';
import { IServerProvider } from '@ask-ell/node';

import { AddOnWrapper, AddOnWrapperParams } from './add-ons';

export type NestApplicationFactoryParams = {
  addons: AddOnWrapperParams;
  module: IEntryNestModule;
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
