import { PartialType } from "@nestjs/swagger";
import { Role } from "src/core/entities/role.schema";

export namespace RoleRequestDto {
    export class CreateRoleDto extends Role {}
    export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
}
