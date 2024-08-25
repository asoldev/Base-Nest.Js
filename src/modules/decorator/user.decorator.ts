import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/cores/__schema__/user.schema';

type CurrentUser = User & {};

export const CurrentUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user: CurrentUser = request.user;

        return data ? user?.[data] : user;
    },
);
