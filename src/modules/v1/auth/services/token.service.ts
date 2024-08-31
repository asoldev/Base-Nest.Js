import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    public async generateTokens(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(payload),
            this.generateRefreshToken(payload),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }

    public generateAccessToken(payload): Promise<string> {
        const expiresInOneYear: number = 30 * 24 * 60 * 60;

        return this.jwtService.signAsync(payload, {
            expiresIn: expiresInOneYear,
        });
    }

    public generateRefreshToken(payload): Promise<string> {
        const expiresInOneYear: number = 365 * 24 * 60 * 60;

        return this.jwtService.signAsync(payload, {
            expiresIn: expiresInOneYear,
        });
    }
}
