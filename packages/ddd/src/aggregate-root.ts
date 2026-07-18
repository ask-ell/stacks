import { Entity } from "@ask-ell/core";

import { IAggregateRoot } from "./aggregate-root.interface";
import { AggregateRootState } from "./types";


export abstract class AggregateRoot<EntityState>
  extends Entity<AggregateRootState<EntityState>>
  implements IAggregateRoot<EntityState>
{ }
