import { ISnapshotable, IResult } from '../primitives';

export interface IEntity<EntityState> extends ISnapshotable<EntityState> {
  updateAndCheckStateValidity(
    settingFunction: (oldState: EntityState) => Partial<EntityState>
  ): void;
  checkStateValidity(newState: EntityState): IResult;
}
