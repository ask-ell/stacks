import { Controller, Get } from "@nestjs/common";

import { ArticleState } from "../../../../application";

import { ArticleService } from "./article.service";


@Controller('articles')
export class ArticleController {
    constructor(
        private articleService: ArticleService
    ){}

    @Get()
    findAll(): Promise<ArticleState[]> {
        return this.articleService.findAll()
    }
}
