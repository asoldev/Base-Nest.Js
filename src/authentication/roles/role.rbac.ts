import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRbac {
  constructor(private readonly grant: string[]) {}

  can(...permissions: string[]): boolean {
    return this.checkPermissions(permissions);
  }

  any(...permissions: string[][]): boolean {
    return permissions
      .map((permission) => {
        return this.can(...permission);
      })
      .some((result) => result);
  }

  private checkPermissions(permissions: string[]): boolean {
    if (!permissions.length) {
      return false;
    }
    for (const permission of permissions) {
      if (!this.grant.includes(permission)) {
        return false;
      }
    }

    return true;
  }
}
