import { ApiProperty } from '@nestjs/swagger';

import { ICreateArticleUseCaseInput } from '../../../../../application';

export class CreateArticleDTO implements ICreateArticleUseCaseInput {
  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string;
}
