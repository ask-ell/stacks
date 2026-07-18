import { IResult } from "@ask-ell/core";

import { ICreateRepositoryDTO } from "./dto/inputs/repository/create-repository.dto.interface";
import { RepositoryRootURLFactoryDTO } from "./urls/utils/repository";
import { IUpdateRepositoryDTO } from "./dto/inputs/repository/update-repository.dto.interface";


export interface IGithubClient {
    readonly rootURL: URL;
    getRepository(query: RepositoryRootURLFactoryDTO): Promise<IResult>;
    createRepository(body: ICreateRepositoryDTO): Promise<IResult>;
    updateRepository(dto: IUpdateRepositoryDTO): Promise<IResult>;
    deleteRepository(dto: RepositoryRootURLFactoryDTO): Promise<IResult>;
}