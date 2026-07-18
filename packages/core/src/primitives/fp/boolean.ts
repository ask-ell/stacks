export const _if =
  (condition: boolean) =>
  <A>(resultA: A) =>
  <B>(resultB: B) =>
    condition ? resultA : resultB;
