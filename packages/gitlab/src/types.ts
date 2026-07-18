import { HttpClient } from "@ask-ell/core";


export type GitlabClientParams = {
    token: string;
    rootURL?: URL;
    httpClient?: HttpClient;
};
