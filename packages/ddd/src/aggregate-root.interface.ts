import { IEntity } from "@ask-ell/core";

import { AggregateRootState } from "./types";


export interface IAggregateRoot<EntityState extends AggregateRootState> extends IEntity<EntityState> { }
