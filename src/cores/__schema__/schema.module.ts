import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Permissions, PermissionsSchema } from './permission.schema';
import { Role, RoleSchema } from './role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Permissions.name,
        schema: PermissionsSchema,
      },
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class SchemaModule {}
