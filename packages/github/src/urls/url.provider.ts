import { URLFactory } from "@ask-ell/core";

import { createRepositoryUrlFactory, deleteRepositoryUrlFactory, getRepositoryUrlFactory, RepositoryRootUrlFactoryDTO, updateRepositoryUrlFactory } from "./utils/repository";


export class URLProvider {
    readonly getRepositoryUrlFactory: URLFactory<RepositoryRootUrlFactoryDTO>;
    readonly createRepositoryUrlFactory: URLFactory<string>;
    readonly updateRepositoryUrlFactory: URLFactory<RepositoryRootUrlFactoryDTO>;
    readonly deleteRepositoryUrlFactory: URLFactory<RepositoryRootUrlFactoryDTO>;

    constructor(rootUrl: URL){
        this.getRepositoryUrlFactory = getRepositoryUrlFactory(rootUrl);
        this.createRepositoryUrlFactory = createRepositoryUrlFactory(rootUrl);
        this.updateRepositoryUrlFactory = updateRepositoryUrlFactory(rootUrl);
        this.deleteRepositoryUrlFactory = deleteRepositoryUrlFactory(rootUrl);
    }
}