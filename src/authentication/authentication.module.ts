import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/cores/__schema__/role.schema';
import { User, UserSchema } from 'src/cores/__schema__/user.schema';
import { UsersModule } from '../apis/user/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { RbacService } from './services/rbac.service';
import { TokenService } from './services/token.service';
import { COLLECTION_NAME } from 'src/cores/__schema__/config/enum';
import { SchemaModule } from 'src/cores/__schema__/schema.module';

@Module({
    imports: [
        SchemaModule,
        ConfigModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                publicKey: configService.get<string>('jwt.publicKey'),
                privateKey: configService.get<string>('jwt.privateKey'),
                signOptions: {
                    algorithm: 'RS256',
                    issuer: 'AuthService',
                    expiresIn: configService.get<string>('jwt.expiresIn'),
                },
            }),
            inject: [ConfigService],
        }),
        UsersModule,
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, TokenService, JwtService, RbacService],
    exports: [AuthenticationService, TokenService, JwtService, RbacService],
})
export class AuthenticationModule {}
