import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../apis/user/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService
    ) { }

    public async generateTokens(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(payload),
            this.generateRefreshToken(payload)
        ])
        return {
            accessToken,
            refreshToken,
        }
    }

    public generateAccessToken(payload): Promise<string> {
        const expiresInOneYear = 30 * 24 * 60 * 60; // 30 days in seconds

        // Generate and sign the refresh token with the specified expiration time
        return this.jwtService.signAsync(payload, {
            expiresIn: expiresInOneYear,
        });
    }

    public generateRefreshToken(payload): Promise<string> {
        const expiresInOneYear = 365 * 24 * 60 * 60; // 1 year in seconds

        // Generate and sign the refresh token with the specified expiration time
        return this.jwtService.signAsync(payload, {
            expiresIn: expiresInOneYear,
        });
    }
}
