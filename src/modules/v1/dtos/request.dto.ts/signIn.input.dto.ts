import { Transform } from "class-transformer";
import { IsString, Length } from "class-validator";

export class SignInInputDto {
    @IsString()
    username: string;

    @IsString()
    @Length(6, 18, { message: 'Password must be between 6 and 18 characters' })
    @Transform(({ value }) => value.trim()) // Trim whitespace from the password
    password: string;
}