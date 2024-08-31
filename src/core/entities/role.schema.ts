import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { COLLECTION_NAME } from "./enum/collection-name.enum";
import { User } from "./user.schema";
import { BaseEntity } from "./base.schema";
import { Permissions, PERMISSION_ACTIONS } from "./permission.schema";

@Schema({ collection: COLLECTION_NAME.ROLE })
export class Role extends BaseEntity {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop()
    description: string;

    @ApiProperty()
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
RoleSchema.index({ "permissions.key": 1, "permissions.value": 1 });
