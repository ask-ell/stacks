import { IResult } from "@ask-ell/core"

import { CreateProjectDTO } from "./dto/inputs/project/create-project.dto"
import { UpdateProjectDTO } from "./dto/inputs/project/update-project.dto"
import { NamespaceDTO } from "./dto/outputs/namespace/namespace"
import { ProjectDTO } from "./dto/outputs/project/project.dto"
import { SearchNamespacesDTO } from "./dto/inputs/namespace/search-namespace.dto"


export interface IGitlabClient {
    readonly rootURL: URL;
    searchNamespaces(dto: SearchNamespacesDTO): Promise<IResult<NamespaceDTO[]>>;
    getProject(projectId: string): Promise<IResult<ProjectDTO>>;
    createProject(body: CreateProjectDTO): Promise<IResult<ProjectDTO>>;
    updateProject(body: UpdateProjectDTO): Promise<IResult<ProjectDTO>>;
    archiveProject(projectId: string): Promise<IResult>;
    unarchiveProject(projectId: string): Promise<IResult>;
    deleteProject(projectId: string): Promise<IResult>;
}