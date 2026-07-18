import { Id } from "@ask-ell/core/dist/src/ddd";


// TODO: move
export type IdFactory<EntityState> = (entityState: EntityState) => Id;