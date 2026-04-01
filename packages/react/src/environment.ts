import { MaybeUndefined } from "@ask-ell/core";

export const environment: MaybeUndefined<string> = (process.env as any).NODE_ENV;