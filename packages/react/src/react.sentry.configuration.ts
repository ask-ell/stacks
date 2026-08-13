import { ConsoleLogger, ILogger, MaybeUndefined } from '@ask-ell/core';
import { SentryConfiguration, SentryConfigurationProps } from '@ask-ell/sentry';
import { BrowserOptions, init } from '@sentry/react';
import { Client } from '@sentry/core';

import { environment } from './environment';

type ReactSentryClientFactory = (
  options: BrowserOptions
) => MaybeUndefined<Client>;

type ReactSentryConfigurationProps = Omit<
  SentryConfigurationProps<ReactSentryClientFactory>,
  'environment' | 'logger' | 'init'
> & { logger?: ILogger };

export class ReactSentryConfiguration extends SentryConfiguration<ReactSentryClientFactory> {
  constructor(props: ReactSentryConfigurationProps) {
    super({
      ...props,
      init,
      environment,
      logger: props.logger ?? new ConsoleLogger(),
    });
  }
}
