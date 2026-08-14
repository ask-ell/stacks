import { MaybeUndefined } from './primitives';

export const getNodeEnvironmentVariable = (): MaybeUndefined<string> =>
  process.env['NODE_ENV'];

export function isOnDevelopmentMode(): boolean {
  const nodeEnvironmentVariable: MaybeUndefined<string> =
    getNodeEnvironmentVariable();
  return nodeEnvironmentVariable
    ? nodeEnvironmentVariable === 'development'
    : false;
}
