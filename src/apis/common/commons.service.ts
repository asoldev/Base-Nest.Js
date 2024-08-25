import { Injectable } from '@nestjs/common';
import { CreateCommonDto } from './dtos/create-common.dto';
import { UpdateCommonDto } from './dtos/update-common.dto';

@Injectable()
export class CommonsService {
    create(createCommonDto: CreateCommonDto) {
        return 'This action adds a new common';
    }

    findAll() {
        return `This action returns all commons`;
    }

    findOne(id: number) {
        return `This action returns a #${id} common`;
    }

    update(id: number, updateCommonDto: UpdateCommonDto) {
        return `This action updates a #${id} common`;
    }

    remove(id: number) {
        return `This action removes a #${id} common`;
    }
}
