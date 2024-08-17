import { PartialType } from '@nestjs/mapped-types';
import { Permissions } from '../../../cores/__schema__/permission.schema';

export namespace PermissionDto {
  export class CreatePermissionDto extends Permissions {}
  export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
}
