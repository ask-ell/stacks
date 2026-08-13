import { HttpClient, IHttpClient, IResult } from '@ask-ell/core';

import { ICreateRepositoryDTO } from './dto/inputs/repository/create-repository.dto.interface';
import { RepositoryRootURLFactoryDTO } from './urls/utils/repository';
import { IUpdateRepositoryDTO } from './dto/inputs/repository/update-repository.dto.interface';
import { IGithubClient } from './github.client.interface';
import { GithubClientParams } from './types';
import { URLProvider } from './urls/url.provider';

export class GithubClient implements IGithubClient {
  readonly rootURL: URL;
  private headers: HeadersInit;
  private urlProvider: URLProvider;
  private httpClient: IHttpClient;

  constructor({ token, httpClient, rootURL }: GithubClientParams) {
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
    };
    this.httpClient = httpClient ?? new HttpClient();
    this.rootURL = rootURL ?? new URL('https://github.com');
    const apiRootURL: URL = new URL(`https://api.${this.rootURL.hostname}`);
    this.urlProvider = new URLProvider(apiRootURL);
  }

  getRepository(query: RepositoryRootURLFactoryDTO): Promise<IResult> {
    return this.httpClient.get({
      url: this.urlProvider.getRepositoryUrlFactory(query),
      headers: this.headers,
    });
  }

  createRepository({
    organisationId,
    ...body
  }: ICreateRepositoryDTO): Promise<IResult> {
    return this.httpClient.post({
      url: this.urlProvider.createRepositoryUrlFactory(organisationId),
      headers: this.headers,
      body,
    });
  }

  updateRepository({
    organisationId,
    repositoryId,
    ...body
  }: IUpdateRepositoryDTO): Promise<IResult> {
    return this.httpClient.patch({
      url: this.urlProvider.updateRepositoryUrlFactory({
        organisationId,
        repositoryId,
      }),
      headers: this.headers,
      body,
    });
  }

  deleteRepository(query: RepositoryRootURLFactoryDTO): Promise<IResult> {
    return this.httpClient.delete({
      url: this.urlProvider.deleteRepositoryUrlFactory(query),
      headers: this.headers,
    });
  }
}
