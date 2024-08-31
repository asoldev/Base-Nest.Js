import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Length } from "class-validator";

export namespace AuthenticationRequestDto {
    export class AuthenticationSignInDto {
        @IsNotEmpty()
        @IsString()
        username: string;

        @IsNotEmpty()
        @IsString()
        @Length(6, 18, { message: "Password must be between 6 and 18 characters" })
        @Transform(({ value }) => value.trim())
        password: string;
    }
}
