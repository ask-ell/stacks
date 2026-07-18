import { type IStringable } from '../primitives/oop/stringable'


export class Json<Data> implements IStringable {
  constructor(private readonly data: Data) {}

  toString(): string {
    return JSON.stringify(this.data)
  }
}
