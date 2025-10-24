import { existsSync, readFileSync } from "node:fs";
import { ILogger } from "@ask-ell/core";

import { SecretFactory } from "./types";

const DOCKER_SECRETS_DIRECTORY = '/run/secrets';
const DOCKER_SECRETS_FILE_PATH = `${DOCKER_SECRETS_DIRECTORY}/ask`;

export const askDockerSecretsFactory = (logger: ILogger): SecretFactory<object> => (): object => {
    const isRunningInsideDocker: boolean = existsSync(DOCKER_SECRETS_DIRECTORY);
    if(!isRunningInsideDocker){
        logger.warn('Application is not running inside Docker container. Secrets are not available.');
        return {};
    }

    const areAskSecretsExist: boolean = existsSync(DOCKER_SECRETS_FILE_PATH);
    if(!areAskSecretsExist){
        logger.warn('Ask secrets are not registred.');
        return {};
    }

    return JSON.parse(readFileSync(DOCKER_SECRETS_FILE_PATH, 'utf-8'));
}