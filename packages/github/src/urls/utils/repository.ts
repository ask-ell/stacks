import { URLFactoryFromRootURL } from "@ask-ell/core";


export type RepositoryRootUrlFactoryDTO = {
    organisationId: string;
    repositoryId: string;
};

const repositoryRootUrlFactory: URLFactoryFromRootURL<RepositoryRootUrlFactoryDTO> =
    (apiRootUrl: URL) => ({ organisationId, repositoryId }: RepositoryRootUrlFactoryDTO) =>
        new URL(`repos/${organisationId}/${repositoryId}`, apiRootUrl);

export const getRepositoryUrlFactory: URLFactoryFromRootURL<RepositoryRootUrlFactoryDTO> = repositoryRootUrlFactory;

export const createRepositoryUrlFactory: URLFactoryFromRootURL<string> =
    (apiRootUrl: URL) => (organisationId: string): URL =>
        new URL(`orgs/${organisationId}/repos`, apiRootUrl);

export const updateRepositoryUrlFactory: URLFactoryFromRootURL<RepositoryRootUrlFactoryDTO> = repositoryRootUrlFactory;

export const deleteRepositoryUrlFactory: URLFactoryFromRootURL<RepositoryRootUrlFactoryDTO> = repositoryRootUrlFactory;