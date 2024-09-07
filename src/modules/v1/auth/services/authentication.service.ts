import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "src/core/entities/user.schema";
import { BaseDto } from "src/core/utils/base-dto.helper";
import { AbstractDataServices } from "src/modules/abstraction/data-services.abstract";
import { AuthenticationRequestDto } from "../../dtos/request.dto.ts/authentication.request.dto";
import { TokenService } from "./token.service";

@Injectable()
export class AuthenticationService {
    constructor(
        private dataService: AbstractDataServices,
        private tokenService: TokenService
    ) {}

    public async signIn(email: string, pass: string): Promise<any> {
        const user = BaseDto.plainToClass(User, await this.dataService.users.findOne({ email }));
        if (!user) {
            throw new NotFoundException("User not found.");
        }

        const isMatchPassword = await bcrypt.compare(pass, user.password);
        if (isMatchPassword) {
            throw new UnauthorizedException("Password not match.");
        }

        const { accessToken, refreshToken } = await this.tokenService.generateTokens(user);
        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    public async register(registerDto: AuthenticationRequestDto.AuthenticationRegisterDto) {
        const { email, password, first_name, last_name } = registerDto;
        const existingUser = await this.dataService.users.findOne({
            email,
        });

        if (existingUser) {
            throw new BadRequestException("Username or email already exists.");
        }

        const saltOrRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltOrRounds);

        const document: Partial<User> = {
            email,
            password: hashPassword,
            first_name,
            last_name,
        };
        return BaseDto.plainToClass(User, await this.dataService.users.insertOne(document));
    }
}
