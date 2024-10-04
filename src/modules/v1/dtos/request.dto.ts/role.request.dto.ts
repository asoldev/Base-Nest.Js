import { PartialType } from "@nestjs/mapped-types/dist/partial-type.helper";
import { Role } from "src/core/entities/role.schema";

export namespace RoleRequestDto {
  export class CreateRoleDto extends Role {}
  export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
}
