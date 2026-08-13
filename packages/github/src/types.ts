import { HttpClient } from '@ask-ell/core';

export type GithubClientParams = {
  token: string;
  rootURL?: URL;
  httpClient?: HttpClient;
};
