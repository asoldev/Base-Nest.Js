import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PermissionDto } from '../dto/request-permission.dto';
import { PermissionService } from '../services/permission.service';
import {
  ParsedQueryParams,
  SearchParams,
} from '../../../modules/decorator/search.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAll(@SearchParams() params: ParsedQueryParams) {
    return this.permissionService.findAll(params);
  }

  @Post('create')
  create(@Body() dto: PermissionDto.CreatePermissionDto) {
    return this.permissionService.insertOne(dto);
  }

  @Put('update/:id')
  update(@Param() id: string, @Body() dto: PermissionDto.UpdatePermissionDto) {
    return this.permissionService.updateOne(id, dto);
  }

  @Delete('delete/:id')
  delete(@Param() id: string) {
    return this.permissionService.deleteOne(id, false);
  }
}
