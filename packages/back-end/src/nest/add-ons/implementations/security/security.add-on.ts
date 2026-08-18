import { INestApplication, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

import { IAddOn } from '../../add-on.interface';

export class SecurityAddOn<T> implements IAddOn<T> {
  apply(application: INestApplication<T>): void {
    application.enableCors();
    application.use(helmet());
    application.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: false,
      })
    );
  }
}
