import { Injectable } from "@nestjs/common";
import { FilterQuery, Types } from "mongoose";
import { COLLECTION_NAME } from "src/core/entities/enum/collection-name.enum";
import { PERMISSION_ACTIONS, Permissions } from "src/core/entities/permission.schema";
import { Role } from "src/core/entities/role.schema";
import { User } from "src/core/entities/user.schema";
import { CacheManagerService } from "src/core/frameworks/cache-manager/cache-manager.service";
import { AbstractDataServices } from "src/modules/abstracts/data-services.abstract";

@Injectable()
export class RbacService {
    constructor(
        private cacheManagerService: CacheManagerService,
        private dataService: AbstractDataServices
    ) {}

    async checkUserPermissions(user: User, entityType: string, permission: PERMISSION_ACTIONS): Promise<boolean> {
        const cacheKey: string = this.cacheManagerService.generateKey(COLLECTION_NAME.ROLE, user._id.toString());

        const cachedRole: Role | null = await this.cacheManagerService.get(cacheKey);

        if (cachedRole) {
            const hasPermission = cachedRole.permissions.some(
                (p: Permissions) => p.key === entityType && p.value.includes(permission)
            );
            if (hasPermission) {
                return true;
            }
        }

        const filter: FilterQuery<Role> = {
            user: new Types.ObjectId(user._id),
            permissions: {
                $elemMatch: {
                    key: entityType,
                    value: { $in: [permission] },
                },
            },
            is_active: true,
        };
        const role: Role = await this.dataService.roles.findOne(filter);

        if (role) {
            await this.cacheManagerService.set(cacheKey, role);
            return true;
        }

        return false;
    }
}
