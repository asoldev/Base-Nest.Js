import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { PERMISSION_ACTIONS } from "src/core/entities/shared/permission.schema";
import { RBAcPermissions } from "src/shared/decorator/rbac.permissions.decorator";
import { RbacService } from "../services/rbac.service";
import { AuthGuard } from "./auth.guard";

@Injectable()
export class RBAcGuard extends AuthGuard implements CanActivate {
    constructor(
        protected jwtService: JwtService,
        protected configService: ConfigService,
        protected reflector: Reflector,
        private readonly rbacService: RbacService
    ) {
        super(jwtService, configService, reflector);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (this.getReflectorPublic(context)) return true;

        const request = context.switchToHttp().getRequest();
        const permission = this.getReflectorPermission(context);
        const entitiesTypeId = request.headers["entities_type_id"];
        const user = request.user;

        if (!entitiesTypeId) {
            throw new ForbiddenException("Missing field entities type.");
        }

        if (!permission) {
            return true;
        }

        const hasRequiredPermissions = await this.rbacService.checkUserPermissions(user, entitiesTypeId, permission);

        if (!hasRequiredPermissions) {
            throw new ForbiddenException("Insufficient permissions. Access denied.");
        }

        return hasRequiredPermissions;
    }

    private getReflectorPermission(context: ExecutionContext): PERMISSION_ACTIONS {
        const permission =
            this.reflector.get<PERMISSION_ACTIONS>(RBAcPermissions.name, context.getHandler()) ||
            this.reflector.get<PERMISSION_ACTIONS>(RBAcPermissions.name, context.getClass());

        return permission;
    }
}
