import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../apis/user/services/users.service';
import { MESSAGES } from '../../common/response.message';
import { TokenService } from './token.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  // public async signIn(username: string, pass: string): Promise<any> {
  //     const user = await this.usersService.findOne(username);
  //     if (!user) {
  //         throw new NotFoundException({
  //             data: null,
  //             error: true,
  //             message: MESSAGES.USER_NOT_FOUND,
  //         });
  //     }
  //     if (user?.password !== pass) {
  //         throw new UnauthorizedException({
  //             data: null,
  //             error: true,
  //             message: MESSAGES.PASSWORD_NOT_MATCH,
  //         });
  //     }
  //     const { password, ...result } = user;
  //     const { accessToken, refreshToken } = await this.tokenService.generateTokens(result);
  //     return {
  //         data: {
  //             user: result,
  //             accessToken, refreshToken
  //         },
  //         error: false,
  //         message: MESSAGES.GET_SUCCESSFUL,
  //         code: HttpStatus.OK
  //     }
  // }
}
