import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { COLLECTION_NAME } from "src/core/entities/enum/collection-name.enum";
import { User } from "src/core/entities/user.schema";
import { CacheManagerService } from "src/core/frameworks/cache-manager/cache-manager.service";
import { AbstractDataServices } from "src/modules/abstraction/data-services.abstract";

@Injectable()
export class UsersService {
    constructor(
        public dataService: AbstractDataServices,
        public cacheManagerService: CacheManagerService
    ) {}

    public async delete(_id: Types.ObjectId, hard: boolean): Promise<User> {
        const isDeleted = await this.dataService.users.deleteOne(_id, hard);
        const cacheKey = this.cacheManagerService.generateKey(COLLECTION_NAME.USER, isDeleted._id.toString());

        if (hard) {
            await this.cacheManagerService.del(cacheKey);
        } else {
            await this.cacheManagerService.set(cacheKey, isDeleted);
        }

        return isDeleted;
    }
}
