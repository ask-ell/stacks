import { ILogger, MaybeUndefined } from "@ask-ell/core"
import { NestLogger } from "@ask-ell/nest"
import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common"
import { Id } from "@ask-ell/ddd"

import type { ArticleState, ICreateArticleUseCase, IUnitOfWork, IUpdateArticleUseCase } from "../../../../application"

import { CREATE_ARTICLE_USE_CASE_PROVIDER, UNIT_OF_WORK_PROVIDER, UPDATE_ARTICLE_USE_CASE_PROVIDER } from "../../config/providers"
import { articleMockDataList } from "./article.data"
import { CreateArticleDTO } from "./dto/create.article.dto"
import { UpdateArticleDTO } from "./dto/update.article.dto"


@Injectable()
export class ArticleService {
    private logger: ILogger = NestLogger.fromClass(ArticleService)

    constructor(
        @Inject(UNIT_OF_WORK_PROVIDER)
        private unitOfWork: IUnitOfWork,
        @Inject(CREATE_ARTICLE_USE_CASE_PROVIDER)
        private createArticleUseCase: ICreateArticleUseCase,
        @Inject(UPDATE_ARTICLE_USE_CASE_PROVIDER)
        private updateArticleUseCase: IUpdateArticleUseCase
    ){
        this.persistData().catch(this.logger.error.bind(this.logger))
    }

    async findAll(): Promise<ArticleState[]> {
        return this.unitOfWork.getArticleProvider().findAll()
    }

    async findOne(id: Id): Promise<ArticleState> {
        const article: MaybeUndefined<ArticleState> = await this.unitOfWork.getArticleProvider().findOneById(id)
        if(!article){
            throw new NotFoundException()
        }
        return article;
    }

    create(dto: CreateArticleDTO): Promise<ArticleState> {
        return this.createArticleUseCase.run(dto);
    }

    async updateOne(dto: UpdateArticleDTO): Promise<ArticleState> {
        const updatedArticle: MaybeUndefined<ArticleState> = await this.updateArticleUseCase.run(dto)
        if(!updatedArticle){
            throw new ForbiddenException()
        }
        return updatedArticle
    }

    private async persistData(): Promise<void> {
        await Promise.all(articleMockDataList.map(this.createArticleUseCase.run.bind(this.createArticleUseCase)))
    }
}
