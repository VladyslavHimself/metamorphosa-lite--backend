import { createParamDecorator, ExecutionContext } from '@nestjs/common';
('@nestjs/common');

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
