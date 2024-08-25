import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpStatus,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { MESSAGES } from 'src/common/response.message';
import { COLLECTION_NAME } from 'src/cores/__schema__/config/enum';
import { PERMISSION_ACTIONS } from 'src/cores/__schema__/permission.schema';
import { IRepositoryService } from 'src/cores/interfaces/repository.interface';
import { RBAcPermissions } from 'src/modules/decorator/rbac.permissions.decorator';
import {
    ParsedQueryParams,
    SearchParams,
} from 'src/modules/decorator/search.decorator';
import { UsersService } from '../user/services/users.service';
import { MongoDBIdValidationPipe } from './../../modules/pipes/mongodb-id-validation.pipe';
import { CommonsService } from './commons.service';
import { CreateCommonDto } from './dtos/create-common.dto';
import { UpdateCommonDto } from './dtos/update-common.dto';

@Controller('commons')
export class CommonsController {
    private readonly servicesMap: Record<string, IRepositoryService<any>>;
    constructor(
        private readonly commonsService: CommonsService,
        private readonly usersService: UsersService,
    ) {
        this.servicesMap = {
            [COLLECTION_NAME.USER]: this.usersService,
        };
    }

    @Get()
    @RBAcPermissions(PERMISSION_ACTIONS.GET)
    async getAll(
        @Headers('service') service: string,
        @SearchParams() params: ParsedQueryParams,
    ) {
        const serviceClass = this.servicesMap[service];
        if (!serviceClass) {
            throw new BadRequestException(
                `No service found for type ${service}`,
            );
        }

        return {
            data: await this.servicesMap[service].findAll(params),
            message: MESSAGES.GET_SUCCESSFUL,
            error: false,
            code: HttpStatus.OK,
        };
    }

    @Post()
    create(@Body() createCommonDto: CreateCommonDto) {
        return this.commonsService.create(createCommonDto);
    }

    @Get(':id')
    async findOne(
        @Headers('service') service: string,
        @Param('id', new MongoDBIdValidationPipe()) id: string,
    ) {
        const serviceClass = this.servicesMap[service];
        if (!serviceClass) {
            throw new BadRequestException(
                `No service found for type ${service}`,
            );
        }

        return {
            data: await this.servicesMap[service].findOneById(id),
            message: MESSAGES.GET_SUCCESSFUL,
            error: false,
            code: HttpStatus.OK,
        };
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCommonDto: UpdateCommonDto) {
        return this.commonsService.update(+id, updateCommonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commonsService.remove(+id);
    }
}
