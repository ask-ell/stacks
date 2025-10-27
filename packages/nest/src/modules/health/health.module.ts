import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";

import { PingMiddleware } from "./middlewares";


@Module({
    providers: [PingMiddleware]
})
export class HealthModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(PingMiddleware)
            .forRoutes({
                path: '/health/ping',
                method: RequestMethod.GET
            });
    }
}