import { MaybeNullOrUndefined } from './nullable';

export type StringOrNullOrUndefined = MaybeNullOrUndefined<string>;

export const string = <D>(data: D): string => JSON.stringify(data);

export const isEmptyString = (data: string): boolean => data.length > 0;

export const stringToNumber = (data: string): number => parseInt(data, 10);

export const toKebabCase = (data: string): string =>
  data.toLocaleLowerCase().replace(/\s/gm, '-');
