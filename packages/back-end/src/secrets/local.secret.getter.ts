import { fileSecretGetter, FileSecretGetter } from "./file.secret.getter";


const LOCAL_SECRETS_DIRECTORY = '.secrets';

export const localSecretGetter: FileSecretGetter = fileSecretGetter
    (LOCAL_SECRETS_DIRECTORY)
    ('Secrets directory not exists on this project. Local secrets will be unavailable.');
