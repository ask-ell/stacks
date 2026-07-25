import { Dirent, existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ILogger } from "@ask-ell/core";

import { SecretGetter } from "./types";


export type FileSecretGetter = (logger: ILogger) => SecretGetter;

export const fileSecretGetter = (rootDirectoryPath: string) => (warningMessage: string): FileSecretGetter => (logger: ILogger): SecretGetter => (): object => {
    const isDirectoryExists: boolean = existsSync(rootDirectoryPath);
    if(!isDirectoryExists){
        logger.warn(warningMessage);
        return {};
    }

    return readdirSync(rootDirectoryPath, { withFileTypes: true })
        .filter((entry: Dirent<string>): boolean => entry.isFile())
        .reduce((secrets: Record<string, string>, entry): object => {
            const filePath: string = join(rootDirectoryPath, entry.name);
            secrets[entry.name] = readFileSync(filePath, 'utf-8').trim();
            return secrets;
        }, {});
}
