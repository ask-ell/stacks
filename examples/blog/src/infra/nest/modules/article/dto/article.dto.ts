import { ApiProperty } from '@nestjs/swagger';

import { ArticleState } from '../../../../../application';

export class ArticleDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string;

  constructor({ id, title, description }: ArticleState) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
