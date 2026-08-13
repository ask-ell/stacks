import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ArticleState } from '../../../../application';

import { ArticleService } from './article.service';
import { CreateArticleDTO } from './dto/create.article.dto';
import { UpdateArticleDTO } from './dto/update.article.dto';
import { ArticleDTO } from './dto/article.dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiResponse({
    type: [ArticleDTO],
  })
  @Get()
  findAll(): Promise<ArticleState[]> {
    return this.articleService.findAll();
  }

  @ApiResponse({
    type: ArticleDTO,
  })
  @Get(':id')
  findOne(
    @Query('id')
    id: string
  ): Promise<ArticleState> {
    return this.articleService.findOne(id);
  }

  @ApiResponse({
    type: ArticleDTO,
  })
  @Post()
  create(
    @Body()
    dto: CreateArticleDTO
  ): Promise<ArticleState> {
    return this.articleService.create(dto);
  }

  @ApiResponse({
    type: ArticleDTO,
  })
  @Put(':id')
  update(
    @Query('id')
    id: string,
    @Body()
    dto: UpdateArticleDTO
  ): Promise<ArticleState> {
    dto.id = id;
    return this.articleService.updateOne(dto);
  }
}
