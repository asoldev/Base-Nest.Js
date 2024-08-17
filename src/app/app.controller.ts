import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { IsPublic } from '../modules/decorator/public.decorator';

@Controller()
export class AppController {
  constructor() {}

  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get()
  getHello() {
    return 'Heath check';
  }
}
