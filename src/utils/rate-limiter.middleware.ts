import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs
    handler: (req: Request, res: Response) => {
        res.status(HttpStatus.TOO_MANY_REQUESTS).json({
            statusCode: HttpStatus.TOO_MANY_REQUESTS,
            message: "Rate limit exceeded. Please try again later.",
        });
    },
});

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        rateLimiter(req, res, next);
    }
}
