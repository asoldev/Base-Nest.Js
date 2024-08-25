import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { CommonsModule } from './common/commons.module';
import { SchemaModule } from 'src/cores/__schema__/schema.module';

@Module({
    imports: [SchemaModule, UsersModule, CommonsModule],
})
export class ApiModule {}
