import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ILogger, MaybeUndefined } from '@ask-ell/core';
import { NestLogger } from '@ask-ell/nest';
import { Id } from '@ask-ell/ddd';

import type {
  ArticleState,
  ICreateArticleUseCase,
  IArticleProvider,
  IUpdateArticleUseCase,
} from '../../../../application';

import {
  ARTICLE_PROVIDER_PROVIDER,
  CREATE_ARTICLE_USE_CASE_PROVIDER,
  UPDATE_ARTICLE_USE_CASE_PROVIDER,
} from '../../config/providers';
import { articleMockDataList } from './article.data';
import { CreateArticleDTO } from './dto/create.article.dto';
import { UpdateArticleDTO } from './dto/update.article.dto';
import { ArticleDTO } from './dto/article.dto';

@Injectable()
export class ArticleService {
  private logger: ILogger = NestLogger.fromClass(ArticleService);

  constructor(
    @Inject(ARTICLE_PROVIDER_PROVIDER)
    private articleProvider: IArticleProvider,
    @Inject(CREATE_ARTICLE_USE_CASE_PROVIDER)
    private createArticleUseCase: ICreateArticleUseCase,
    @Inject(UPDATE_ARTICLE_USE_CASE_PROVIDER)
    private updateArticleUseCase: IUpdateArticleUseCase
  ) {
    this.persistData().catch(this.logger.error.bind(this.logger));
  }

  async findAll(): Promise<ArticleDTO[]> {
    const articles: ArticleState[] = await this.articleProvider.findAll();
    return articles.map(
      (article: ArticleState): ArticleDTO => new ArticleDTO(article)
    );
  }

  async findOne(id: Id): Promise<ArticleDTO> {
    const article: MaybeUndefined<ArticleState> =
      await this.articleProvider.findOneById(id);
    if (!article) {
      throw new NotFoundException();
    }
    return new ArticleDTO(article);
  }

  async create(dto: CreateArticleDTO): Promise<ArticleDTO> {
    return new ArticleDTO(await this.createArticleUseCase.run(dto));
  }

  async updateOne(dto: UpdateArticleDTO): Promise<ArticleDTO> {
    const updatedArticle: MaybeUndefined<ArticleState> =
      await this.updateArticleUseCase.run(dto);
    if (!updatedArticle) {
      throw new ForbiddenException();
    }
    return new ArticleDTO(updatedArticle);
  }

  private async persistData(): Promise<void> {
    await Promise.all(
      articleMockDataList.map(
        this.createArticleUseCase.run.bind(this.createArticleUseCase)
      )
    );
  }
}
