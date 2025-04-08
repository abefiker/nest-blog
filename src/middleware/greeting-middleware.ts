import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, Request, NextFunction } from 'express'
@Injectable()
export class greetingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.body.greeting === 'hello') {
            req.body.randomNumber = Math.random()
        } else {
            return res.status(403).json({ message: "no greeting passed or equal to hello" })
        }
    }
}