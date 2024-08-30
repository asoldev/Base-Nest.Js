import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoRepository } from "./mongo.repository";
import { COLLECTION_NAME } from "src/core/entities/enum/collection-name.enum";
import { Role } from "src/core/entities/role.schema";
import { User } from "src/core/entities/user.schema";
import { AbstractDataServices } from "src/modules/abstracts/data-services.abstract";

@Injectable()
export class MongoDataServices
    implements AbstractDataServices, OnApplicationBootstrap
{
    users: MongoRepository<User>;
    roles: MongoRepository<Role>;

    constructor(
        @InjectModel(COLLECTION_NAME.USER)
        private UserRepository: Model<User>,

        @InjectModel(COLLECTION_NAME.ROLE)
        private RoleRepository: Model<Role>
    ) {}

    onApplicationBootstrap() {
        this.users = new MongoRepository(this.UserRepository);
        this.roles = new MongoRepository(this.RoleRepository);
    }
}
