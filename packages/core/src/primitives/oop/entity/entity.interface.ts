import { IResult } from "../../../result";
import { ISnapshotable } from "../snapshotable.interface";

export interface IEntity<EntityState> extends ISnapshotable<EntityState> {
  updateAndCheckStateValidity(
    settingFunction: (oldState: EntityState) => Partial<EntityState>
  ): void;
  checkStateValidity(newState: EntityState): IResult;
}
