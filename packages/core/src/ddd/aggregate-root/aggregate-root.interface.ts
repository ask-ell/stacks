import { IEntity } from "../../primitives";

import { AggregateRootState } from "./types";

export interface IAggregateRoot<EntityState>
  extends IEntity<AggregateRootState<EntityState>> { }
