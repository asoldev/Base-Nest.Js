import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import {
  ParsedQueryParams,
  QueryParams,
} from '../modules/decorator/query.decorator';
import { RBAcPermissions } from '../modules/decorator/rbac.permissions.decorator';

@Controller()
export class AppController {
  constructor() {}

  @HttpCode(HttpStatus.OK)
  @RBAcPermissions('permission@create', 'permission1@create')
  @Get()
  getHello(@QueryParams() params: ParsedQueryParams) {
    return params;
  }
}
