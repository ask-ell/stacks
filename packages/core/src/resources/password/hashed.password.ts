import { IHashedPassword } from './hashed.password.interface';

export class HashedPassword implements IHashedPassword {
  constructor(private hashedValue: string) {}

  toString(): string {
    return this.hashedValue;
  }
}
