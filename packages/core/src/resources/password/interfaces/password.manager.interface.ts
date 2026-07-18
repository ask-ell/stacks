import { IHashedPassword } from "./hashed.password.interface";

export type GenerateRandomPasswordResultDTO = {
  randomPasswordPlainText: string;
  hashedPassword: IHashedPassword;
};

export interface IPasswordManager {
  generateFromPlainText(plainTextValue: string): Promise<IHashedPassword>;
  generateRandom(size: number): Promise<GenerateRandomPasswordResultDTO>;
  matchs(
    plainTextValue: string,
    hashedPassword: IHashedPassword
  ): Promise<boolean>;
}
