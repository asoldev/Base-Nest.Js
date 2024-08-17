import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Timestamps } from './timestamp.schema';

@Schema()
export class Permissions extends Timestamps {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: String, required: true })
  title: string;
}

export const PermissionsSchema = SchemaFactory.createForClass(Permissions);
