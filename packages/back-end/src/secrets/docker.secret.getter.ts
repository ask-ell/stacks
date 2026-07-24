import { FileSecretGetter, fileSecretGetter } from "./file.secret.getter";


const DOCKER_SECRETS_DIRECTORY = '/run/secrets';

export const dockerSecretGetter: FileSecretGetter = fileSecretGetter
    (DOCKER_SECRETS_DIRECTORY)
    ('Application is not running inside Docker container. Docker secrets will be unavailable.')
