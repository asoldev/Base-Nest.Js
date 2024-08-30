import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { toNumberIfPossible } from "../../core/utils/toNumberIfPossible";
import { FilterQuery, ProjectionType, SortOrder } from "mongoose";

export type ParsedQueryParams = {
    /**
     * Query filter to apply to the database query.
     * This can be used to specify conditions to match documents.
     */
    filter: FilterQuery<any>;

    /**
     * Sorting order for the query results.
     * Can be a string (field name), an object with field names and sort orders,
     * or an array of field names with sort orders. Can also be undefined or null.
     */
    sort?:
        | string
        | { [key: string]: SortOrder | { $meta: any } }
        | [string, SortOrder][]
        | undefined
        | null;

    /**
     * Projection to specify which fields to include or exclude from the query results.
     * Can be a list of fields to include or exclude.
     */
    projection?: ProjectionType<any>;

    /**
     * Maximum number of documents to return.
     * Specifies the limit of documents in the query results.
     */
    limit: number;

    /**
     * Number of documents to skip before starting to collect the result set.
     * Used for pagination to skip a certain number of documents.
     */
    skip: number;

    /**
     * Fields to populate in the query results.
     * Can be an array of field names to include related documents.
     */
    populate?: string[];
};

export const SearchParams = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): ParsedQueryParams => {
        const request = ctx.switchToHttp().getRequest();
        const queryParams = new URLSearchParams(request.query);

        const parsedParams: ParsedQueryParams = {
            filter: {},
            sort: {},
            projection: {},
            limit: parseInt(queryParams.get("__limit") ?? "10", 10),
            skip: parseInt(queryParams.get("__skip") ?? "0", 10),
            populate: queryParams.get("__populate")
                ? queryParams.get("__populate").split(",")
                : [],
        };

        for (const [key, value] of queryParams.entries()) {
            if (key.startsWith("__")) {
                if (key === "__sort") {
                    parsedParams.sort = value
                        .split(",")
                        .reduce((acc, field) => {
                            const direction = field.startsWith("-") ? -1 : 1;
                            const fieldName = field.replace(/^-/, "");
                            acc[fieldName] = direction;
                            return acc;
                        }, {});
                } else if (key === "__projection") {
                    parsedParams.projection = value
                        .split(",")
                        .reduce((acc, field) => {
                            acc[field] = 1;
                            return acc;
                        }, {});
                }
            } else {
                const [field, operator] = key.split("__");
                const numericValue = toNumberIfPossible(value);

                switch (operator) {
                    case "in":
                        parsedParams.filter[field] = {
                            $in: value.split(",").map(toNumberIfPossible),
                        };
                        break;
                    case "like":
                        parsedParams.filter[field] = {
                            $regex: value,
                            $options: "i",
                        };
                        break;
                    case "gt":
                        parsedParams.filter[field] = {
                            $gt: numericValue,
                        };
                        break;
                    case "gte":
                        parsedParams.filter[field] = {
                            $gte: numericValue,
                        };
                        break;
                    case "lt":
                        parsedParams.filter[field] = {
                            $lt: numericValue,
                        };
                        break;
                    case "lte":
                        parsedParams.filter[field] = {
                            $lte: numericValue,
                        };
                        break;
                    default:
                        parsedParams.filter[field] = numericValue;
                }
            }
        }

        return parsedParams;
    }
);
