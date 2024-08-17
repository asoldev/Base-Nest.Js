import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { toNumberIfPossible } from '../../utils/toNumberIfPossible';
import { FilterQuery, ProjectionType, SortOrder } from 'mongoose';

export interface ParsedQueryParams {
  filter: FilterQuery<any>;
  sort?:
    | string
    | { [key: string]: SortOrder | { $meta: any } }
    | [string, SortOrder][]
    | undefined
    | null;
  projection?: ProjectionType<any>;
  limit: number;
  skip: number;
  populate?: string[];
}

/**
 * Custom decorator to parse query parameters from the request.
 * @param data - Optional metadata (not used in this case).
 * @param ctx - The execution context for the current request.
 * @returns An object containing parsed query parameters.
 */
export const QueryParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ParsedQueryParams => {
    const request = ctx.switchToHttp().getRequest();
    const queryParams = new URLSearchParams(request.query);

    const parsedParams: ParsedQueryParams = {
      filter: {},
      sort: {},
      projection: {},
      limit: parseInt(queryParams.get('__limit') ?? '10', 10),
      skip: parseInt(queryParams.get('__skip') ?? '0', 10),
      populate: queryParams.get('__populate')
        ? queryParams.get('__populate').split(',')
        : [],
    };

    for (const [key, value] of queryParams.entries()) {
      if (key.startsWith('__')) {
        if (key === '__sort') {
          parsedParams.sort = value.split(',').reduce((acc, field) => {
            const direction = field.startsWith('-') ? -1 : 1;
            const fieldName = field.replace(/^-/, '');
            acc[fieldName] = direction;
            return acc;
          }, {});
        } else if (key === '__projection') {
          parsedParams.projection = value.split(',').reduce((acc, field) => {
            acc[field] = 1;
            return acc;
          }, {});
        }
      } else {
        const [field, operator] = key.split('__');
        const numericValue = toNumberIfPossible(value);

        switch (operator) {
          case 'in':
            parsedParams.filter[field] = {
              $in: value.split(',').map(toNumberIfPossible),
            };
            break;
          case 'gt':
            parsedParams.filter[field] = { $gt: numericValue };
            break;
          case 'gte':
            parsedParams.filter[field] = { $gte: numericValue };
            break;
          case 'lt':
            parsedParams.filter[field] = { $lt: numericValue };
            break;
          case 'lte':
            parsedParams.filter[field] = { $lte: numericValue };
            break;
          default:
            parsedParams.filter[field] = numericValue;
        }
      }
    }

    return parsedParams;
  },
);
