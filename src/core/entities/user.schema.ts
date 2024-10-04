import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Document } from "mongoose";
import { COLLECTION_NAME } from "./enum/collection-name.enum";
@Schema({ collection: COLLECTION_NAME.USER })
export class User extends Document {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: String, required: true })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: String, required: true })
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ type: String, required: true })
  @Exclude()
  password: string;

  @IsString()
  @IsOptional()
  @Expose()
  @Prop({ type: String, required: false, default: null })
  phone: string;

  @Expose()
  @Prop({ type: Boolean, required: false, default: true })
  is_active: boolean;

  @IsString()
  @IsOptional()
  @Prop({ type: String, required: false, default: null })
  refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ refresh_token: "desc" });
