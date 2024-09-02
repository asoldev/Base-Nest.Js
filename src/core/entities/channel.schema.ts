import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { COLLECTION_NAME } from "./enum/collection-name.enum";
import { Language } from "./shared/language.schema";

@Schema({ collection: COLLECTION_NAME.CHANNEL })
export class Channel extends Document {
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
    domain: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop({ type: Array<Language>, required: true })
    languages: Language[];
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
