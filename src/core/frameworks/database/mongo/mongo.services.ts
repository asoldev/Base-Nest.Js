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
import { AbstractDataServices } from "src/modules/abstraction/data-services.abstract";
import { AbstractRepositoryService } from "src/modules/abstraction/repository.abstract";
import { MongoRepository } from "./mongo.repository";

@Injectable()
export class MongoServices implements AbstractDataServices, OnApplicationBootstrap {
    private _users: MongoRepository<User>;

    private _roles: MongoRepository<Role>;

    private _entitiesTypes: MongoRepository<EntitiesTypes>;

    private _categories: AbstractRepositoryService<Categories>;

    private _posts: AbstractRepositoryService<Posts>;

    private _tags: AbstractRepositoryService<Tags>;

    private _channel: AbstractRepositoryService<Channel>;

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
        this._users = new MongoRepository(this.UserRepository);
        this._roles = new MongoRepository(this.RoleRepository);
        this._entitiesTypes = new MongoRepository(this.EntitiesTypesRepository);
        this._categories = new MongoRepository(this.CategoriesRepository);
        this._posts = new MongoRepository(this.PostsRepository);
        this._tags = new MongoRepository(this.TagsRepository);
        this._channel = new MongoRepository(this.ChannelRepository);
    }

    public get users(): MongoRepository<User> {
        return this._users;
    }

    public get roles(): MongoRepository<Role> {
        return this._roles;
    }

    public get entitiesTypes(): MongoRepository<EntitiesTypes> {
        return this._entitiesTypes;
    }

    public get categories(): AbstractRepositoryService<Categories> {
        return this._categories;
    }

    public get posts(): AbstractRepositoryService<Posts> {
        return this._posts;
    }

    public get tags(): AbstractRepositoryService<Tags> {
        return this._tags;
    }

    public get channel(): AbstractRepositoryService<Channel> {
        return this._channel;
    }
}
