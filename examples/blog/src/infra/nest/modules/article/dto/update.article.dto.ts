import { ApiProperty } from '@nestjs/swagger';

import { IUpdateArticleUseCaseInput } from '../../../../../application';

export class UpdateArticleDTO implements IUpdateArticleUseCaseInput {
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string;
}
