import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "src/core/entities/user.schema";
import { BaseDto } from "src/core/utils/base-dto.helper";
import { AbstractDataServices } from "src/modules/abstracts/data-services.abstract";
import { TokenService } from "./token.service";

@Injectable()
export class AuthenticationService {
    constructor(
        private dataService: AbstractDataServices,
        private tokenService: TokenService
    ) {}

    public async signIn(username: string, pass: string): Promise<any> {
        const user = BaseDto.plainToClass(User, await this.dataService.users.findOne({ username }));
        if (!user) {
            throw new NotFoundException("User not found");
        }
        if (user?.password !== pass) {
            throw new UnauthorizedException("Password not match.");
        }
        const { accessToken, refreshToken } = await this.tokenService.generateTokens(user);
        return {
            user,
            accessToken,
            refreshToken,
        };
    }
}
