import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Base } from 'src/cores/__schema__/base.schema';
import { COLLECTION_NAME } from './config/enum';

@Schema({ collection: COLLECTION_NAME.USER })
export class User extends Base {
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

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop({ type: String, required: true, unique: true })
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Exclude()
    @Prop({ type: String, required: true })
    password: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Expose()
    @Prop({ type: String, required: false, default: null })
    phone: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Prop({ type: String, required: false, default: null })
    refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
