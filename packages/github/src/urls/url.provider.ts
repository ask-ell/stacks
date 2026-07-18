import { URLFactory } from "@ask-ell/core";

import { createRepositoryUrlFactory, deleteRepositoryUrlFactory, getRepositoryUrlFactory, RepositoryRootURLFactoryDTO, updateRepositoryUrlFactory } from "./utils/repository";


export class URLProvider {
    readonly getRepositoryUrlFactory: URLFactory<RepositoryRootURLFactoryDTO>;
    readonly createRepositoryUrlFactory: URLFactory<string>;
    readonly updateRepositoryUrlFactory: URLFactory<RepositoryRootURLFactoryDTO>;
    readonly deleteRepositoryUrlFactory: URLFactory<RepositoryRootURLFactoryDTO>;

    constructor(rootUrl: URL){
        this.getRepositoryUrlFactory = getRepositoryUrlFactory(rootUrl);
        this.createRepositoryUrlFactory = createRepositoryUrlFactory(rootUrl);
        this.updateRepositoryUrlFactory = updateRepositoryUrlFactory(rootUrl);
        this.deleteRepositoryUrlFactory = deleteRepositoryUrlFactory(rootUrl);
    }
}