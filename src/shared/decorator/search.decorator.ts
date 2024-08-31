import { BadGatewayException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import aqp, { AqpQuery } from "api-query-params";

export const SearchParams = createParamDecorator((data: unknown, ctx: ExecutionContext): AqpQuery => {
    try {
        const request = ctx.switchToHttp().getRequest();
        const queryParams = String(new URLSearchParams(request.query));
        const query = aqp(queryParams);
        if (!query.limit) query.limit = 10;
        if (!query.skip) query.skip = 0;
        return query;
    } catch {
        throw new BadGatewayException("Invalid format url");
    }
});
