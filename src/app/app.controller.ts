import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { IsPublic } from "src/shared/decorator/public.decorator";

@Controller()
export class AppController {
  constructor() {}

  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get()
  getHello() {
    return "Heath check";
  }
}
