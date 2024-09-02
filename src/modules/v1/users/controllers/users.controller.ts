import { Body, Controller, Delete, Get, Param, ParseBoolPipe, Post, Put } from "@nestjs/common";
import { AqpQuery } from "api-query-params";
import { Types } from "mongoose";
import { User } from "src/core/entities/user.schema";
import { BaseDto } from "src/core/utils/base-dto.helper";
import { PaginationDto } from "src/modules/abstracts/repository.abstract";
import { SearchParams } from "src/shared/decorator/search.decorator";
import { ParseObjectIdPipe } from "src/shared/pipes/mongodb-id-validation.pipe";
import { UserRequestDto } from "../../dtos/request.dto.ts/user.request.dto";
import { UsersService } from "../services/users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAll(@SearchParams() params: AqpQuery): Promise<PaginationDto<User>> {
        return this.usersService.dataService.users.findAll(params);
    }

    @Get(":_id")
    getOne(@Param("_id", new ParseObjectIdPipe()) _id: Types.ObjectId): Promise<User> {
        return this.usersService.dataService.users.findOneById(_id);
    }

    @Post()
    create(@Body() dto: UserRequestDto.UserCreateDto): Promise<User> {
        return this.usersService.dataService.users.insertOne(BaseDto.plainToClass(UserRequestDto.UserCreateDto, dto));
    }

    @Put(":_id")
    update(
        @Param("_id", new ParseObjectIdPipe()) _id: Types.ObjectId,
        @Body() dto: UserRequestDto.UserUpdateDto
    ): Promise<User> {
        return this.usersService.dataService.users.updateOne(
            _id,
            BaseDto.plainToClass(UserRequestDto.UserUpdateDto, dto)
        );
    }

    @Delete(":_id/:hard")
    remove(
        @Param("_id", new ParseObjectIdPipe()) _id: Types.ObjectId,
        @Param("hard", new ParseBoolPipe()) hard: boolean
    ): Promise<User> {
        return this.usersService.delete(_id, hard);
    }
}
