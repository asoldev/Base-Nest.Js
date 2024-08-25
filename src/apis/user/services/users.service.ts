import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { COLLECTION_NAME } from 'src/cores/__schema__/config/enum';
import { User } from 'src/cores/__schema__/user.schema';
import { RepositoryService } from 'src/cores/services/repository.service';

@Injectable()
export class UsersService extends RepositoryService<User> {
    constructor(
        @InjectModel(COLLECTION_NAME.USER)
        userModel: Model<User>,
    ) {
        super(userModel);
    }
}
