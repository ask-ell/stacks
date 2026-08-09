import { Module } from "@nestjs/common";
import { ApplicationBase } from "@ask-ell/back-end";

import { ArticleModule } from "./modules";
import { ApplicationErrorInterceptor } from "./interceptors";


@Module({
    imports: [ArticleModule],
    providers: [ApplicationErrorInterceptor]
})
export class AppModule extends ApplicationBase {}
