// mongodb-id-validation.pipe.ts

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class MongoDBIdValidationPipe implements PipeTransform<string, Types.ObjectId> {
    transform(value: string): Types.ObjectId {
        const isValidObjectId = Types.ObjectId.isValid(value);

        if (!isValidObjectId) {
            throw new BadRequestException('Invalid ObjectId');
        }

        return new Types.ObjectId(value);
    }
}
