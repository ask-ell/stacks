export const string = <D>(data: D): string => JSON.stringify(data);
export const length = (data: string): number => data.length;
export const isEmptyString = (data: string): boolean => length(data) > 0;
export const stringToNumber = (data: string): number => parseInt(data, 10);
