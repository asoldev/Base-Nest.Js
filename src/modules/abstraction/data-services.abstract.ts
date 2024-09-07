import { Categories } from "src/core/entities/categories.schema";
import { Channel } from "src/core/entities/channel.schema";
import { EntitiesTypes } from "src/core/entities/entities_types.schema";
import { Posts } from "src/core/entities/posts.schema";
import { Role } from "src/core/entities/role.schema";
import { Tags } from "src/core/entities/tag.schema";
import { User } from "src/core/entities/user.schema";
import { AbstractRepository } from "./repository.abstract";

/**
 * AbstractDataServices serves as a base class for data service implementations
 * that manage user and role entities. It defines abstract properties for repositories
 * which handle CRUD operations for these entities.
 *
 * @abstract
 * @class AbstractDataServices
 */
export abstract class AbstractDataServices {
    abstract users: AbstractRepository<User>;
    abstract roles: AbstractRepository<Role>;
    abstract entitiesTypes: AbstractRepository<EntitiesTypes>;
    abstract categories: AbstractRepository<Categories>;
    abstract posts: AbstractRepository<Posts>;
    abstract tags: AbstractRepository<Tags>;
    abstract channel: AbstractRepository<Channel>;
}
