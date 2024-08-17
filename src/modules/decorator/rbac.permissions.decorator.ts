import { SetMetadata } from '@nestjs/common';

export const RBAcPermissions = (...permissions: string[]) =>
  SetMetadata(RBAcPermissions.name, permissions);

export const RBAcAnyPermissions = (...permissions: string[][]) =>
  SetMetadata(RBAcAnyPermissions.name, permissions);
