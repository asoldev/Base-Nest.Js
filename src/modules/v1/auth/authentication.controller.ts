import { AuthenticationService } from "./services/authentication.service";
import { AuthenticationRequestDto } from "../dtos/request.dto.ts/authentication.request.dto";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

@Controller("authentication")
export class AuthenticationController {
    constructor(private authenticationService: AuthenticationService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() signInDto: AuthenticationRequestDto.AuthenticationSignInDto) {
        return this.authenticationService.signIn(signInDto.username, signInDto.password);
    }
}
