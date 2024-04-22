import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from './services/token.service';

@Module({
    imports: [
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
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, TokenService],
    exports: [AuthenticationService, TokenService]
})
export class AuthenticationModule { }
