import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/core/entities/user.schema";

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    public async generateTokens(payload: User) {
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(payload),
            this.generateRefreshToken(payload),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }

    public generateAccessToken(payload: User): Promise<string> {
        const expiresInOneYear: number = 30 * 24 * 60 * 60;

        return this.jwtService.signAsync(payload, {
            expiresIn: expiresInOneYear,
        });
    }

    public generateRefreshToken(payload: User): Promise<string> {
        const expiresInOneYear: number = 365 * 24 * 60 * 60;

        return this.jwtService.signAsync(payload, {
            expiresIn: expiresInOneYear,
        });
    }
}
