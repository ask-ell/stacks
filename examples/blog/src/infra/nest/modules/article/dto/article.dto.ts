import { ArticleState } from "../../../../../application";


export class ArticleDTO implements ArticleState {
    id!: string;
    title!: string;
    description!: string;
}
