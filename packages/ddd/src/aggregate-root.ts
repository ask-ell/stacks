import { Entity } from '@ask-ell/core';

import { IAggregateRoot } from './aggregate-root.interface';
import { AggregateRootState } from './types';

export abstract class AggregateRoot<EntityState extends AggregateRootState>
  extends Entity<EntityState>
  implements IAggregateRoot<EntityState> {}
