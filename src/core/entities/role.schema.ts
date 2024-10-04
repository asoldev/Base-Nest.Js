import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { IsString, IsNotEmpty, IsMongoId, IsOptional } from "class-validator";
import { Document, Types } from "mongoose";
import { COLLECTION_NAME } from "./enum/collection-name.enum";
import { User } from "./user.schema";

@Schema({ collection: COLLECTION_NAME.ROLE })
export class Role extends Document {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop()
  description: string;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: Types.ObjectId, ref: COLLECTION_NAME.USER })
  user: User;

  @IsOptional()
  @Expose()
  @Prop({ type: Array<Permissions>, default: null, required: false })
  permissions: Permissions[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.index({ "permissions.entities_types": 1, "permissions.action": 1 });
