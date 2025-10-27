import { HttpClient, IResult } from "@ask-ell/core";

import { ICreateRepositoryDTO } from "./dto/inputs/repository/create-repository.dto.interface";
import { RepositoryRootUrlFactoryDTO } from "./urls/utils/repository";
import { IUpdateRepositoryDTO } from "./dto/inputs/repository/update-repository.dto.interface";
import { IGithubClient } from "./github.client.interface";
import { GithubClientParams } from "./types";
import { URLProvider } from "./urls/url.provider";


export class GithubClient implements IGithubClient {
    readonly rootUrl: URL;
    private headers: HeadersInit;
    private urlProvider: URLProvider;

    constructor(params: GithubClientParams) {
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${params.token}`
        };
        this.rootUrl = params.rootUrl ?? new URL('https://github.com');
        const apiRootUrl: URL = new URL(`https://api.${this.rootUrl.hostname}`);
        this.urlProvider = new URLProvider(apiRootUrl);
    }

    getRepository(query: RepositoryRootUrlFactoryDTO): Promise<IResult> {
        return HttpClient.get({
            url: this.urlProvider.getRepositoryUrlFactory(query),
            headers: this.headers
        })
    }

    createRepository({ organisationId, ...body }: ICreateRepositoryDTO): Promise<IResult> {
        return HttpClient.post({
            url: this.urlProvider.createRepositoryUrlFactory(organisationId),
            headers: this.headers,
            body
        });
    }

    updateRepository({ organisationId, repositoryId, ...body }: IUpdateRepositoryDTO): Promise<IResult> {
        return HttpClient.patch({
            url: this.urlProvider.updateRepositoryUrlFactory({
                organisationId,
                repositoryId
            }),
            headers: this.headers,
            body
        });
    }

    deleteRepository(query: RepositoryRootUrlFactoryDTO): Promise<IResult> {
        return HttpClient.delete({
            url: this.urlProvider.deleteRepositoryUrlFactory(query),
            headers: this.headers,
        });
    }
}