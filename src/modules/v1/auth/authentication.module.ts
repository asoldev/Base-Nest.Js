import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { DataServicesModule } from "src/core/frameworks/database/data-services.module";
import { RbacService } from "./services/rbac.service";
import { TokenService } from "./services/token.service";

@Module({
    imports: [
        DataServicesModule,
        ConfigModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                publicKey: configService.get<string>("jwt.publicKey"),
                privateKey: configService.get<string>("jwt.privateKey"),
                signOptions: {
                    algorithm: "RS256",
                    issuer: "AuthService",
                    expiresIn: configService.get<string>("jwt.expiresIn"),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [TokenService, JwtService, RbacService],
    exports: [TokenService, JwtService, RbacService],
})
export class AuthenticationModule {}
