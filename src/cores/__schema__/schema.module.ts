import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COLLECTION_NAME } from './config/enum';
import { RoleSchema } from './role.schema';
import { UserSchema } from './user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: COLLECTION_NAME.USER,
                schema: UserSchema,
            },
            {
                name: COLLECTION_NAME.ROLE,
                schema: RoleSchema,
            },
        ]),
    ],
    exports: [MongooseModule],
})
export class SchemaModule {}
