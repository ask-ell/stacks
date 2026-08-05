import { IEntity } from "@ask-ell/core";

import { AggregateRootState } from "./types";


export type IAggregateRoot<EntityState extends AggregateRootState> = IEntity<EntityState>
