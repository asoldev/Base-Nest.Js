import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
    IsMongoId,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { User } from 'src/cores/__schema__/user.schema';
import { Base } from './base.schema';
import { COLLECTION_NAME } from './config/enum';
import { PERMISSION_ACTIONS, Permissions } from './permission.schema';

@Schema({ collection: COLLECTION_NAME.ROLE })
export class Role extends Base {
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

    @ApiProperty({ type: String, required: true })
    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop({ type: Types.ObjectId, ref: COLLECTION_NAME.USER })
    user: User;

    @ApiProperty({ type: Array<PERMISSION_ACTIONS>, required: false })
    @IsOptional()
    @Expose()
    @Prop({ type: Array<Permissions>, default: null, required: false })
    permissions: Permissions[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.index({ 'permissions.key': 1, 'permissions.value': 1 });
