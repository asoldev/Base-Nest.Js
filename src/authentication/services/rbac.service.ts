import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { COLLECTION_NAME } from 'src/cores/__schema__/config/enum';
import { Role } from 'src/cores/__schema__/role.schema';
import { User } from 'src/cores/__schema__/user.schema';
import { RepositoryService } from 'src/cores/services/repository.service';
import { CacheManagerService } from './../../cache-manager/cache-manager.service';
import { PERMISSION_ACTIONS } from 'src/cores/__schema__/permission.schema';

@Injectable()
export class RbacService extends RepositoryService<Role> {
    constructor(
        private cacheManagerService: CacheManagerService,
        @InjectModel(COLLECTION_NAME.ROLE) roleModel: Model<Role>,
    ) {
        super(roleModel);
    }

    async checkUserPermissions(
        user: User,
        entityType: string,
        permission: PERMISSION_ACTIONS,
    ): Promise<boolean> {
        const cacheKey = `role-${user._id.toString()}`;

        const cachedRole = await this.cacheManagerService.get(cacheKey);

        if (cachedRole) {
            const hasPermission = cachedRole.permissions.some(
                (p: { key: string; value: string | PERMISSION_ACTIONS[] }) =>
                    p.key === entityType && p.value.includes(permission),
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
                    value: { $in: [permission, PERMISSION_ACTIONS.FULL] },
                },
            },
            is_active: true,
        };
        const role = await this.findOneByFilter(filter);

        if (role) {
            await this.cacheManagerService.set(cacheKey, role);
            return true;
        }

        return false;
    }
}
