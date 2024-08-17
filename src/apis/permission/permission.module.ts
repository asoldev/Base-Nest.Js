import { Module } from '@nestjs/common';
import { SchemaModule } from '../../cores/__schema__/schema.module';
import { PermissionController } from './controllers/permission.controller';
import { RoleController } from './controllers/role.controller';
import { PermissionService } from './services/permission.service';
import { RoleService } from './services/role.service';

@Module({
  imports: [SchemaModule],
  controllers: [PermissionController, RoleController],
  providers: [PermissionService, RoleService],
})
export class PermissionModule {}
