import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { COLLECTION_NAME } from "./enum/collection-name.enum";
import { PERMISSION_ACTIONS, Permissions } from "./shared/permission.schema";
import { User } from "./user.schema";

@Schema({ collection: COLLECTION_NAME.ROLE })
export class Role extends Document {
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
RoleSchema.index({ "permissions.entities_types": 1, "permissions.action": 1 });
