import { Injectable, NestMiddleware } from "@nestjs/common";
import type { Request, Response } from 'express'


@Injectable()
export class PingMiddleware implements NestMiddleware {
    use(_request: Request, response: Response): void {
        response.end('Pong');
    }
}