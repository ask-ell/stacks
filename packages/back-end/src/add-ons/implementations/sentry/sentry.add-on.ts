import { Entity, type IResult, ok } from '@ask-ell/core';
import { NestSentryConfiguration } from '@ask-ell/nest';

import { ISentryAddOnState } from './sentry.add-on.state.interface';
import { ISentryAddOn } from './sentry.add-on.interface';

export class SentryAddon<T>
  extends Entity<ISentryAddOnState>
  implements ISentryAddOn<T>
{
  checkStateValidity(): IResult<void> {
    return ok();
  }

  apply(): void {
    const { host, projectId, publicKey } = this.getSnapshot();

    new NestSentryConfiguration({
      publicKey,
      host,
      projectId,
    }).init();
  }
}
