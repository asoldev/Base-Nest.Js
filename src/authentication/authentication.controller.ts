import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { SignInInputDto } from './dtos/signIn.input.dto';

@Controller('authentication')
export class AuthenticationController {
    constructor(private authenticationService: AuthenticationService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInInputDto) {
        return this.authenticationService.signIn(signInDto.username, signInDto.password);
    }
}
