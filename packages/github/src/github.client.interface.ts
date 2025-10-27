import { IResult } from "@ask-ell/core";

import { ICreateRepositoryDTO } from "./dto/inputs/repository/create-repository.dto.interface";
import { RepositoryRootUrlFactoryDTO } from "./urls/utils/repository";
import { IUpdateRepositoryDTO } from "./dto/inputs/repository/update-repository.dto.interface";


export interface IGithubClient {
    readonly rootUrl: URL;
    getRepository(query: RepositoryRootUrlFactoryDTO): Promise<IResult>;
    createRepository(body: ICreateRepositoryDTO): Promise<IResult>;
    updateRepository(dto: IUpdateRepositoryDTO): Promise<IResult>;
    deleteRepository(dto: RepositoryRootUrlFactoryDTO): Promise<IResult>;
}