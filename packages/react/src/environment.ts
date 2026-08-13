import { MaybeUndefined } from '@ask-ell/core';

type EnvironmentVariablesMap = {
  NODE_ENV?: string;
};

export const environment: MaybeUndefined<string> = (
  process.env as EnvironmentVariablesMap
).NODE_ENV;
