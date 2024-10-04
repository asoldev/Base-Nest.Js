import { ForbiddenException, Injectable } from "@nestjs/common";
import { FilterQuery, Types } from "mongoose";
import { COLLECTION_NAME } from "src/core/entities/enum/collection-name.enum";
import { Role } from "src/core/entities/role.schema";
import {
  PERMISSION_ACTIONS,
  Permissions,
} from "src/core/entities/shared/permission.schema";
import { User } from "src/core/entities/user.schema";
import { CacheManagerService } from "src/core/frameworks/cache-manager/cache-manager.service";
import { AbstractDataServices } from "src/modules/abstraction/data-services.abstract";

@Injectable()
export class RbacService {
  constructor(
    private cacheManagerService: CacheManagerService,
    private dataService: AbstractDataServices
  ) {}

  async checkUserPermissions(
    userId: string,
    entitiesTypeId: string,
    permission: PERMISSION_ACTIONS
  ): Promise<boolean> {
    const cacheKey = this.cacheManagerService.generateKey(
      COLLECTION_NAME.ROLE,
      userId
    );

    const cachedRole = await this.cacheManagerService.get(cacheKey);

    if (cachedRole) {
      const hasPermission = cachedRole.permissions.some((p: Permissions) =>
        p.action.includes(permission)
      );
      if (hasPermission) {
        return true;
      }
    }

    const filterRole: FilterQuery<Role> = {
      user: new Types.ObjectId(userId),
      permissions: {
        $elemMatch: {
          entities_types: entitiesTypeId,
          action: { $in: [permission] },
        },
      },
      is_active: true,
    };

    const filterUser: FilterQuery<User> = {
      _id: new Types.ObjectId(userId),
      is_active: true,
    };
    const [role, user] = await Promise.all([
      this.dataService.roles.findOneByFilter(filterRole),
      this.dataService.users.findOneByFilter(filterUser),
    ]);

    if (role && user) {
      await this.cacheManagerService.set(cacheKey, role);
      return true;
    }

    if (!user)
      throw new ForbiddenException("You account is block. Access denied.");
    return false;
  }
}
