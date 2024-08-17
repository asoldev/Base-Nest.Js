import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Timestamps } from '../cores/__schema__/timestamp.schema';
import { Role } from '../cores/__schema__/role.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class User extends Timestamps {
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
  @IsOptional()
  @Expose()
  @Prop({ type: String, required: false, default: null })
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: Array<Role>, required: false, default: [] })
  roles: Role[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Prop({ type: String, required: false, default: null })
  refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
