import { Global, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/user.controller';
import { SchemaModule } from 'src/cores/__schema__/schema.module';

@Global()
@Module({
    imports: [SchemaModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
