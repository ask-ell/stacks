import { IResult, HttpClient } from "@ask-ell/core"

import { CreateProjectDTO } from "./dto/inputs/project/create-project.dto"
import { UpdateProjectDTO } from "./dto/inputs/project/update-project.dto"
import { NamespaceDTO } from "./dto/outputs/namespace/namespace"
import { ProjectDTO } from "./dto/outputs/project/project.dto"
import { IGitlabClient } from "./gitlab.client.interface"
import { GitlabClientParams } from "./types"
import { SearchNamespacesDTO } from "./dto/inputs/namespace/search-namespace.dto"
import { URLProvider } from "./urls/url.provider"


export class GitlabClient implements IGitlabClient {
    readonly rootURL: URL;
    private headers: HeadersInit;
    private urlProvider: URLProvider

    constructor(params: GitlabClientParams) {
        this.headers = {
            'Content-Type': 'application/json',
            'PRIVATE-TOKEN': params.token
        };
        this.rootURL = params.rootURL ?? new URL('https://gitlab.com');
        const apiRootURL: URL = new URL('api/v4/', this.rootURL);
        this.urlProvider = new URLProvider(apiRootURL);
    }

    searchNamespaces(dto: SearchNamespacesDTO): Promise<IResult<NamespaceDTO[]>> {
        return HttpClient.get({
            url: this.urlProvider.searchNamespacesUrlFactory(dto),
            headers: this.headers,
        });
    }

    getProject(projectId: string): Promise<IResult<ProjectDTO>> {
        return HttpClient.get({
            url: this.urlProvider.getProjectUrlFactory(projectId),
            headers: this.headers,
        })
    }

    createProject(body: CreateProjectDTO): Promise<IResult<ProjectDTO>> {
        return HttpClient.post({
            url: this.urlProvider.createProjectUrl,
            headers: this.headers,
            body
        })
    }

    updateProject({ projectId, ...body }: UpdateProjectDTO): Promise<IResult<ProjectDTO>> {
        return HttpClient.put({
            url: this.urlProvider.updateProjectUrlFactory(projectId),
            headers: this.headers,
            body
        })
    }

    archiveProject(projectId: string): Promise<IResult> {
        return HttpClient.post({
            url: this.urlProvider.archiveProjectUrlFactory(projectId),
            headers: this.headers,
        })
    }

    unarchiveProject(projectId: string): Promise<IResult> {
        return HttpClient.post({
            url: this.urlProvider.unarchiveProjectUrlFactory(projectId),
            headers: this.headers,
        })
    }

    deleteProject(projectId: string): Promise<IResult> {
        return HttpClient.delete({
            url: this.urlProvider.deleteProjectUrlFactory(projectId),
            headers: this.headers,
        })
    }
}