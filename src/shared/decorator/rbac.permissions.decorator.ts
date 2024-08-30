import { SetMetadata } from "@nestjs/common";
import { PERMISSION_ACTIONS } from "src/core/entities/permission.schema";

export const RBAcPermissions = (permission: PERMISSION_ACTIONS) =>
    SetMetadata(RBAcPermissions.name, permission);
