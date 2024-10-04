import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { COLLECTION_NAME } from "src/core/entities/enum/collection-name.enum";
import { User } from "src/core/entities/user.schema";
import { AbstractDataServices } from "src/modules/abstraction/data-services.abstract";
import { AbstractRepositoryService } from "src/modules/abstraction/repository.abstract";
import { Role } from "../../../entities/role.schema";
import { MongoRepository } from "./mongo.repository";

@Injectable()
export class MongoServices
  implements AbstractDataServices, OnApplicationBootstrap
{
  constructor(
    @InjectModel(COLLECTION_NAME.USER)
    private UserRepository: Model<User>,

    @InjectModel(COLLECTION_NAME.ROLE)
    private RoleRepository: Model<Role>
  ) {}
  users: AbstractRepositoryService<User>;
  roles: AbstractRepositoryService<Role>;

  onApplicationBootstrap() {
    this.users = new MongoRepository(this.UserRepository);
    this.roles = new MongoRepository(this.RoleRepository);
  }
}
