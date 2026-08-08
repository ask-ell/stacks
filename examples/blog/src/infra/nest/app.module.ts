import { Module } from "@nestjs/common";
import { ApplicationBase } from "@ask-ell/back-end";

import { ArticleModule } from "./modules";


@Module({
    imports: [ArticleModule]
})
export class AppModule extends ApplicationBase {}
