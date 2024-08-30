import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, plainToClass } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { COLLECTION_NAME } from "./enum/collection-name.enum";
import { BaseEntity } from "./base.schema";

@Schema({ collection: COLLECTION_NAME.USER })
export class User extends BaseEntity {
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
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    return plainToClass(User, user, { excludeExtraneousValues: true });
};
