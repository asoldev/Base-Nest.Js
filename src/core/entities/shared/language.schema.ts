import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class Language {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop({ required: true })
    short: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop({ required: true })
    long: string;
}
