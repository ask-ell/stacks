import { IResult } from "../primitives";
import { IEntity } from "./entity.interface";


export abstract class Entity<EntityState> implements IEntity<EntityState> {
  constructor(private state: EntityState) {
    this.checkStateValidityAndThrowError();
  }

  updateAndCheckStateValidity(
    settingFunction: (oldState: EntityState) => Partial<EntityState>
  ): void {
    const newStatePartial: Partial<EntityState> = settingFunction(this.state);
    this.state = {
      ...this.state,
      ...newStatePartial,
    };

    this.checkStateValidityAndThrowError();
  }

  getSnapshot(): EntityState {
    return { ...this.state };
  }

  abstract checkStateValidity(newState: EntityState): IResult;

  protected getState<T>(fn: (state: EntityState) => T): T {
    return fn(this.state);
  }

  private checkStateValidityAndThrowError(): void {
    const result: IResult = this.checkStateValidity(this.state);
    if (result.isAFail()) {
      throw result.getError();
    }
  }
}
