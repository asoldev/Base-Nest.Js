import { Role } from "src/core/entities/role.schema";
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
    /**
     * Abstract repository for managing user entities.
     * Implementations must provide a concrete repository for User entities
     * to perform CRUD operations.
     *
     * @type {AbstractRepository<User>}
     * @abstract
     */
    abstract users: AbstractRepository<User>;

    /**
     * Abstract repository for managing role entities.
     * Implementations must provide a concrete repository for Role entities
     * to perform CRUD operations.
     *
     * @type {AbstractRepository<Role>}
     * @abstract
     */
    abstract roles: AbstractRepository<Role>;
}
