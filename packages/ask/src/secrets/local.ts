import { existsSync, readFileSync } from "node:fs";
import { ILogger } from "@ask-ell/core";

import { SecretFactory } from "./types";

const LOCAL_SECRETS_DIRECTORY = '.ask';
const LOCAL_SECRETS_FILE_PATH = `${LOCAL_SECRETS_DIRECTORY}/secrets.json`;

export const askLocalSecretsFactory = (logger: ILogger): SecretFactory<object> => (): object => {
    const isLocalSecretsDirectoryExists: boolean = existsSync(LOCAL_SECRETS_DIRECTORY);
    if(!isLocalSecretsDirectoryExists){
        logger.warn('"Ask" directory not exists on this project. Local secrets will be unavailable.');
        return {};
    }

    const areAskSecretsExist: boolean = existsSync(LOCAL_SECRETS_FILE_PATH);
    if(!areAskSecretsExist){
        logger.warn('Local secrets file doesn\'t exist.');
        return {};
    }

    return JSON.parse(readFileSync(LOCAL_SECRETS_FILE_PATH, 'utf-8'));
}