import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Categories } from "src/core/entities/categories.schema";
import { Channel } from "src/core/entities/channel.schema";
import { EntitiesTypes } from "src/core/entities/entities_types.schema";
import { COLLECTION_NAME } from "src/core/entities/enum/collection-name.enum";
import { Posts } from "src/core/entities/posts.schema";
import { Role } from "src/core/entities/role.schema";
import { Tags } from "src/core/entities/tag.schema";
import { User } from "src/core/entities/user.schema";
import { AbstractDataServices } from "src/modules/abstracts/data-services.abstract";
import { AbstractRepository } from "src/modules/abstracts/repository.abstract";
import { MongoRepository } from "./mongo.repository";

@Injectable()
export class MongoServices implements AbstractDataServices, OnApplicationBootstrap {
    users: MongoRepository<User>;
    roles: MongoRepository<Role>;
    entitiesTypes: MongoRepository<EntitiesTypes>;
    categories: AbstractRepository<Categories>;
    posts: AbstractRepository<Posts>;
    tags: AbstractRepository<Tags>;
    channel: AbstractRepository<Channel>;

    constructor(
        @InjectModel(COLLECTION_NAME.USER)
        private UserRepository: Model<User>,

        @InjectModel(COLLECTION_NAME.ROLE)
        private RoleRepository: Model<Role>,

        @InjectModel(COLLECTION_NAME.ENTITIES_TYPE)
        private EntitiesTypesRepository: Model<EntitiesTypes>,

        @InjectModel(COLLECTION_NAME.CATEGORIES)
        private CategoriesRepository: Model<Categories>,

        @InjectModel(COLLECTION_NAME.POSTS)
        private PostsRepository: Model<Posts>,

        @InjectModel(COLLECTION_NAME.TAGS)
        private TagsRepository: Model<Tags>,

        @InjectModel(COLLECTION_NAME.CHANNEL)
        private ChannelRepository: Model<Channel>
    ) {}

    onApplicationBootstrap() {
        this.users = new MongoRepository(this.UserRepository);
        this.roles = new MongoRepository(this.RoleRepository);
        this.entitiesTypes = new MongoRepository(this.EntitiesTypesRepository);
        this.categories = new MongoRepository(this.CategoriesRepository);
        this.posts = new MongoRepository(this.PostsRepository);
        this.tags = new MongoRepository(this.TagsRepository);
        this.channel = new MongoRepository(this.ChannelRepository);
    }
}
