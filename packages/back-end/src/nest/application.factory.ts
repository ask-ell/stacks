import { ConsoleLogger, INestApplication } from '@nestjs/common';
import { IEntryNestModule, NestFactory } from '@nestjs/core';

import { AddOnWrapper, AddOnWrapperParams } from './add-ons';

export type NestApplicationFactoryParams = {
  module: IEntryNestModule;
  addons?: AddOnWrapperParams;
};

export async function createNestApplication<T>({
  module,
  addons,
}: NestApplicationFactoryParams): Promise<INestApplication<T>> {
  const application: INestApplication<T> = await NestFactory.create<
    INestApplication<T>
  >(module, {
    logger: new ConsoleLogger({
      json: true,
    }),
  });

  if (addons) {
    new AddOnWrapper(addons).apply(application);
  }

  return application;
}
