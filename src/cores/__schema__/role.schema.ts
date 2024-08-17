import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Timestamps } from './timestamp.schema';

@Schema()
export class Role extends Timestamps {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: String, required: true })
  title: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty({ type: Array<String>, required: false })
  @IsArray({ each: true })
  @IsString({ each: true })
  @IsOptional()
  @Expose()
  @Prop({ type: Array<String>, default: [], required: false })
  permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
