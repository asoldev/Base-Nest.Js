import { Role } from "src/core/entities/role.schema";
import { User } from "src/core/entities/user.schema";
import { AbstractRepositoryService } from "./repository.abstract";

/**
 * AbstractDataServices serves as a base class for data service implementations
 * that manage user and role entities. It defines abstract properties for repositories
 * which handle CRUD operations for these entities.
 *
 * @abstract
 * @class AbstractDataServices
 */
export abstract class AbstractDataServices {
  abstract users: AbstractRepositoryService<User>;
  abstract roles: AbstractRepositoryService<Role>;
}
