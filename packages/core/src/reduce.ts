export const count = (array: number[]): number =>
  array.reduce((acc: number, sum: number) => acc + sum, 0);

export const wrap = <T>(arrayOfArrays: T[][]): T[] =>
  arrayOfArrays.reduce((acc: T[], sum: T[]): T[] => [...acc, ...sum], []);
