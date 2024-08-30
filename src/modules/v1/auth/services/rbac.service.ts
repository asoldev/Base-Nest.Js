import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { PERMISSION_ACTIONS } from "src/core/entities/permission.schema";
import { User } from "src/core/entities/user.schema";
import { CacheManagerService } from "src/core/frameworks/cache-manager/cache-manager.service";
import { AbstractDataServices } from "src/modules/abstracts/data-services.abstract";

@Injectable()
export class RbacService {
    constructor(
        private cacheManagerService: CacheManagerService,
        private dataService: AbstractDataServices
    ) {}

    async checkUserPermissions(
        user: User,
        entityType: string,
        permission: PERMISSION_ACTIONS
    ): Promise<boolean> {
        const cacheKey = `role-${user._id.toString()}`;

        const cachedRole = await this.cacheManagerService.get(cacheKey);

        if (cachedRole) {
            const hasPermission = cachedRole.permissions.some(
                (p: { key: string; value: string | PERMISSION_ACTIONS[] }) =>
                    p.key === entityType && p.value.includes(permission)
            );
            if (hasPermission) {
                return true;
            }
        }

        const filter = {
            user: new Types.ObjectId(user._id),
            permissions: {
                $elemMatch: {
                    key: entityType,
                    value: { $in: [permission] },
                },
            },
            is_active: true,
        };
        const role = await this.dataService.roles.findOne(filter);

        if (role) {
            await this.cacheManagerService.set(cacheKey, role);
            return true;
        }

        return false;
    }
}
