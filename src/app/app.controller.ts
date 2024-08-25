import { RBAcPermissions } from './../modules/decorator/rbac.permissions.decorator';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { MESSAGES } from 'src/common/response.message';
import { PERMISSION_ACTIONS } from 'src/cores/__schema__/permission.schema';

@Controller()
export class AppController {
    constructor() {}

    @HttpCode(HttpStatus.OK)
    @RBAcPermissions(PERMISSION_ACTIONS.GET)
    @Get()
    getHello() {
        return {
            data: 'Heath check',
            message: MESSAGES.GET_SUCCESSFUL,
            error: false,
            code: HttpStatus.OK,
        };
    }
}
