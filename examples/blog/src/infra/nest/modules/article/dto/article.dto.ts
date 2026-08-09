import { ApiProperty } from "@nestjs/swagger";

import { ArticleState } from "../../../../../application";


// TODO: create DTOFactory class
export class ArticleDTO {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    title!: string;

    @ApiProperty()
    description!: string;

    @ApiProperty()
    href!: string;

    static create({
        id,
        title,
        description
    }: ArticleState): ArticleDTO {
        const dto = new ArticleDTO();
        dto.id = id
        dto.title = title
        dto.description = description
        dto.href = 'http://localhost:3000/articles/' + id
        return dto;
    }
}
