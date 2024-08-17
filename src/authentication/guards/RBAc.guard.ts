import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../modules/decorator/public.decorator';
import {
  RBAcAnyPermissions,
  RBAcPermissions,
} from '../../modules/decorator/rbac.permissions.decorator';
import { RbacService } from '../services/rbac.service';

@Injectable()
export class RBAcGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rbacService: RbacService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const user = request.user;

    if (!user?.role) {
      throw new ForbiddenException('Getting user was failed.');
    }

    const role = await this.rbacService.getRole(user.role);

    if (!this.hasRequiredPermissions(role, context)) {
      throw new ForbiddenException('Insufficient permissions.');
    }

    return true;
  }

  private hasRequiredPermissions(
    role: any,
    context: ExecutionContext,
  ): boolean {
    const perm = this.rbac(context);
    const permAny = this.rbacAny(context);

    if (perm.length > 0 && !role.can(...perm)) {
      return false;
    }

    if (permAny.length > 0 && !role.any(...permAny)) {
      return false;
    }

    return true;
  }

  private rbac(context: ExecutionContext): string[] {
    const permissions =
      this.reflector.get<string[]>(
        RBAcPermissions.name,
        context.getHandler(),
      ) ||
      this.reflector.get<string[]>(RBAcPermissions.name, context.getClass());

    if (permissions !== undefined) {
      return permissions;
    }

    return [];
  }

  private rbacAny(context: ExecutionContext): string[][] {
    const permissions =
      this.reflector.get<string[][]>(
        RBAcAnyPermissions.name,
        context.getHandler(),
      ) ||
      this.reflector.get<string[][]>(
        RBAcAnyPermissions.name,
        context.getClass(),
      );

    if (permissions !== undefined) {
      return permissions;
    }

    return [];
  }
}
