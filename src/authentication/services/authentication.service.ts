import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../apis/user/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Injectable()
export class AuthenticationService {
    constructor(
        private usersService: UsersService,
        private tokenService: TokenService,
    ) { }

    public async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return {
            ...this.tokenService.generateTokens(result),
            user: result
        }
    }
}
