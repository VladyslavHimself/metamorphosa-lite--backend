import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";



@Injectable()
export class UserMiddleware implements NestMiddleware {
    async use(req, res, next) {
        if (!req.headers.authorization) {
            req.user = null
            next()
            return
        }
        
        const token = req.headers.authorization.split(' ')[1]
        try {
            const decode = verify(token, process.env.JWT_ACCESS_SECRET)
            req.user = decode
            next()
        } catch (err) {
            req.user = null
            next()
        }
        
        
    }
}