import { Module } from '@nestjs/common';
import { PermissionModule } from './permission/permission.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [PermissionModule, UsersModule],
})
export class ApiModule {}
