import { type IStringable } from '../primitives';

export class Json<Data> implements IStringable {
  constructor(private readonly data: Data) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}
