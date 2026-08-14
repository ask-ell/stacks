import { getNodeEnvironmentVariable, MaybeUndefined } from '@ask-ell/core';
import { SentryConfiguration, SentryConfigurationProps } from '@ask-ell/sentry';
import { init, NodeClient, NodeOptions } from '@sentry/nestjs';

import { NestLogger } from './utils';

type NestSentryClientFactory = (
  options?: MaybeUndefined<NodeOptions>
) => MaybeUndefined<NodeClient>;

type NestSentryConfigurationProps = Omit<
  SentryConfigurationProps<NestSentryClientFactory>,
  'environment' | 'logger' | 'init'
>;

export class NestSentryConfiguration extends SentryConfiguration<NestSentryClientFactory> {
  constructor(props: NestSentryConfigurationProps) {
    super({
      ...props,
      init,
      logger: NestLogger.fromClass(NestSentryConfiguration),
      environment: getNodeEnvironmentVariable(),
    });
  }
}
