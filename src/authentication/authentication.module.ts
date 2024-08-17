import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../apis/user/users.module';
import {
  Permissions,
  PermissionsSchema,
} from '../cores/__schema__/permission.schema';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { RbacService } from './services/rbac.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Permissions.name,
        schema: PermissionsSchema,
      },
    ]),
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
