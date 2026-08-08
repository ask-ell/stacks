import { Provider } from "@nestjs/common";

import { CreateArticleUseCase, IUnitOfWork, UpdateArticleUseCase } from "../../application";

import { FullStackUnitOfWork } from "./full-stack.unit-of-work";
import { CREATE_ARTICLE_USE_CASE_PROVIDER, UNIT_OF_WORK_PROVIDER, UPDATE_ARTICLE_USE_CASE_PROVIDER } from "../nest";


export const providers: Provider[] = [
    {
        provide: UNIT_OF_WORK_PROVIDER,
        useClass: FullStackUnitOfWork
    },
    {
        provide: CREATE_ARTICLE_USE_CASE_PROVIDER,
        useFactory: (unitOfWork: IUnitOfWork) => new CreateArticleUseCase(unitOfWork),
        inject: [UNIT_OF_WORK_PROVIDER]
    },
    {
        provide: UPDATE_ARTICLE_USE_CASE_PROVIDER,
        useFactory: (unitOfWork: IUnitOfWork) => new UpdateArticleUseCase(unitOfWork),
        inject: [UNIT_OF_WORK_PROVIDER]
    }
]
