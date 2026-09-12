import {
  GenerateRandomPasswordResultDTO,
  HashedPassword,
  IHashedPassword,
  IPasswordManager,
  MaybeNullOrUndefined,
} from '@ask-ell/core';
import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';

export class CryptoPasswordManager implements IPasswordManager {
  async generateFromPlainText(
    plainTextValue: string
  ): Promise<IHashedPassword> {
    const salt: string = randomBytes(16).toString('hex');
    const hashedValue: string = (
      await this.hash(plainTextValue, salt)
    ).toString('hex');
    return new HashedPassword(`${hashedValue}.${salt}`);
  }

  async generateRandomPassword(
    size: number
  ): Promise<GenerateRandomPasswordResultDTO> {
    const randomPasswordPlainText: string =
      randomBytes(size).toString('base64');
    const hashedPassword: IHashedPassword = await this.generateFromPlainText(
      randomPasswordPlainText
    );
    return {
      randomPasswordPlainText,
      hashedPassword,
    };
  }

  async matchs(
    plainTextValue: string,
    hashedPassword: IHashedPassword
  ): Promise<boolean> {
    const [hashedValueInHex, salt] = hashedPassword.toString().split('.');
    const hashedPlainText = await this.hash(plainTextValue, salt);
    const hashedPasswordBuf = Buffer.from(hashedValueInHex, 'hex');
    return timingSafeEqual(hashedPasswordBuf, hashedPlainText);
  }

  private hash = (plainTextValue: string, salt: string) =>
    new Promise<Buffer<ArrayBufferLike>>((resolve, reject) =>
      scrypt(
        plainTextValue,
        salt,
        64,
        (
          error: MaybeNullOrUndefined<Error>,
          _hashedValue: Buffer<ArrayBufferLike>
        ) => {
          if (error) {
            return reject(error);
          }
          resolve(_hashedValue);
        }
      )
    );
}
