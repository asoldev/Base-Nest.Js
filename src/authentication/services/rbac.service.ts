import { ForbiddenException, Injectable } from '@nestjs/common';
import { RBAC } from '../../app/config';
import { RoleRbac } from '../roles/role.rbac';

@Injectable()
export class RbacService {
  constructor() {}

  async getRole(role: string) {
    const permission = RBAC;

    if (!permission.roles.includes(role)) {
      throw new ForbiddenException(`Role ${role} is not defined`);
    }

    if (!permission.permissions) {
      throw new ForbiddenException('Permission list is not defined');
    }

    if (!permission.grants) {
      throw new ForbiddenException('Grant list is not defined');
    }

    if (!permission.grants[role]) {
      throw new ForbiddenException(`Role ${role} does assign to permission`);
    }

    return new RoleRbac(permission.grants[role]);
  }
}
