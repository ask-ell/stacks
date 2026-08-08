import { ApiProperty } from "@nestjs/swagger";

import { ArticleState } from "../../../../../application";


// TODO: improve code
export class ArticleDTO {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    title!: string;

    @ApiProperty()
    description!: string;

    static create({
        id,
        title,
        description
    }: ArticleState){
        const dto = new ArticleDTO();
        dto.id = id
        dto.title = title
        dto.description = description
        return dto;
    }
}
