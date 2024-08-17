import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ParsedQueryParams,
  SearchParams,
} from '../../../modules/decorator/search.decorator';
import { RoleDto } from '../dto/request-role.dto';
import { RoleService } from '../services/role.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@ApiBearerAuth('access_token')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(@SearchParams() params: ParsedQueryParams) {
    return this.roleService.findAll(params);
  }

  @Post('create')
  create(@Body() dto: RoleDto.CreateRoleDto) {
    return this.roleService.insertOne(dto);
  }

  @Put('update/:id')
  update(@Param() id: string, @Body() dto: RoleDto.UpdateRoleDto) {
    return this.roleService.updateOne(id, dto);
  }

  @Delete('delete/:id')
  delete(@Param() id: string) {
    return this.roleService.deleteOne(id, false);
  }
}
