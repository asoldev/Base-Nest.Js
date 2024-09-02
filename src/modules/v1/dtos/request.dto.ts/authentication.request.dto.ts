import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export namespace AuthenticationRequestDto {
    export class AuthenticationSignInDto {
        @IsNotEmpty()
        @IsString()
        @IsEmail()
        email: string;

        @IsNotEmpty()
        @IsString()
        @Length(6, 18, { message: "Password must be between 6 and 18 characters" })
        @Transform(({ value }) => value.trim())
        password: string;
    }

    export class AuthenticationRegisterDto extends AuthenticationSignInDto {
        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        @Expose()
        @Prop({ type: String, required: true })
        first_name: string;

        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        @Expose()
        @Prop({ type: String, required: true })
        last_name: string;
    }
}
