import { ILogger } from "@ask-ell/core"
import { NestLogger } from "@ask-ell/nest"
import { Inject, Injectable } from "@nestjs/common"

import { ArticleState, IUnitOfWork } from "../../../../application"
import { UNIT_OF_WORK_PROVIDER } from "../../config/providers"


@Injectable()
export class ArticleService {
    private logger: ILogger = NestLogger.fromClass(ArticleService)

    constructor(
        @Inject(UNIT_OF_WORK_PROVIDER)
        private unitOfWork: IUnitOfWork
    ){
        this.persistData().catch(this.logger.error.bind(this.logger))
    }

    async findAll(): Promise<ArticleState[]> {
        return this.unitOfWork.getArticleProvider().findAll()
    }

    private async persistData(): Promise<void> {
        // TODO: save from external data file
        await this.unitOfWork.getArticleRepository().save({
            id: 'test',
            title: 'Test',
            description: "Test"
        })
    }
}
