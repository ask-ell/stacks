import { INestApplication } from '@nestjs/common';

export interface IAddOn<T> {
  apply(application: INestApplication<T>): void;
}
