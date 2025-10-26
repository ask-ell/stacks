import { Id } from "@ask-ell/core/dist/src/ddd";

export type IdFactory<EntityState> = (entityState: EntityState) => Id;