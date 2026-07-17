import { ILogger } from "@ask-ell/core";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";


export const TMP_FOLDER_PATH: string = join(process.cwd(), 'tmp');

export const createTmpFolder = (logger: ILogger): void => {
    const isTmpFolderExists: boolean = existsSync(TMP_FOLDER_PATH);
    if(isTmpFolderExists){
        logger.info(`"${TMP_FOLDER_PATH}" folder already exists.`);
        return;
    }
    mkdirSync(TMP_FOLDER_PATH);
    logger.info(`"${TMP_FOLDER_PATH}" folder created.`);
}