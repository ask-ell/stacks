import { URLFactoryFromRootURL } from "@ask-ell/core";


export type RepositoryRootURLFactoryDTO = {
    organisationId: string;
    repositoryId: string;
};

const repositoryRootUrlFactory: URLFactoryFromRootURL<RepositoryRootURLFactoryDTO> =
    (apiRootUrl: URL) => ({ organisationId, repositoryId }: RepositoryRootURLFactoryDTO) =>
        new URL(`repos/${organisationId}/${repositoryId}`, apiRootUrl);

export const getRepositoryUrlFactory: URLFactoryFromRootURL<RepositoryRootURLFactoryDTO> = repositoryRootUrlFactory;

export const createRepositoryUrlFactory: URLFactoryFromRootURL<string> =
    (apiRootUrl: URL) => (organisationId: string): URL =>
        new URL(`orgs/${organisationId}/repos`, apiRootUrl);

export const updateRepositoryUrlFactory: URLFactoryFromRootURL<RepositoryRootURLFactoryDTO> = repositoryRootUrlFactory;

export const deleteRepositoryUrlFactory: URLFactoryFromRootURL<RepositoryRootURLFactoryDTO> = repositoryRootUrlFactory;