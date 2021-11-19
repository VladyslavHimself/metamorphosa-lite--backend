import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context
            .switchToHttp()
            .getRequest<Request>()
        
        if (request['user']) {
            return true
        }
        

        throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED)
    }
}