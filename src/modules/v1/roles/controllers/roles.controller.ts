import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Types } from "mongoose";
import { BaseDto } from "src/core/utils/base-dto.helper";

import { Role } from "src/core/entities/role.schema";
import { PaginationDto } from "src/modules/abstracts/repository.abstract";
import { ParseObjectIdPipe } from "src/shared/pipes/mongodb-id-validation.pipe";
import { RoleRequestDto } from "../../dtos/request.dto.ts/role.request.dto";
import { RolesService } from "../services/role.service";
import { SearchParams } from "src/shared/decorator/search.decorator";
import { AqpQuery } from "api-query-params";

@Controller("roles")
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get()
    async getAll(@SearchParams() params: AqpQuery): Promise<PaginationDto<Role>> {
        return this.rolesService.dataService.roles.findAll(params);
    }

    @Get(":_id")
    async getOne(@Param("_id", new ParseObjectIdPipe()) _id: Types.ObjectId): Promise<Role> {
        return await this.rolesService.dataService.roles.findOneById(_id);
    }

    @Post()
    async create(@Body() dto: RoleRequestDto.CreateRoleDto): Promise<Role> {
        return this.rolesService.dataService.roles.insertOne(BaseDto.plainToClass(RoleRequestDto.CreateRoleDto, dto));
    }

    @Put(":_id")
    async update(
        @Param("_id", new ParseObjectIdPipe()) _id: Types.ObjectId,
        @Body() dto: RoleRequestDto.UpdateRoleDto
    ): Promise<Role> {
        return this.rolesService.dataService.roles.updateOne(
            _id,
            BaseDto.plainToClass(RoleRequestDto.UpdateRoleDto, dto)
        );
    }

    @Delete(":_id")
    async remove(@Param("_id", new ParseObjectIdPipe()) _id: Types.ObjectId): Promise<Role> {
        return this.rolesService.dataService.roles.deleteOne(_id, true);
    }
}
