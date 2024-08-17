import { Role } from './../../../cores/__schema__/role.schema';
import { PartialType } from '@nestjs/mapped-types';

export namespace RoleDto {
  export class CreateRoleDto extends Role {}
  export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
}
