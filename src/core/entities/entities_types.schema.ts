import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { UUID } from "mongodb";
import { Schema as MongooseSchema } from "mongoose";
import { COLLECTION_NAME } from "./enum/collection-name.enum";
import { SchemaFields } from "./shared/schema_fields.schema";

@Schema({ collection: COLLECTION_NAME.ENTITIES_TYPE })
export class EntitiesTypes extends SchemaFields {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop({ required: true })
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop({ required: true })
    slug: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop({ required: true })
    type: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop({ required: true })
    language: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop({ required: false, default: new UUID() })
    language_id: string;

    @Expose()
    @Prop({ type: MongooseSchema.Types.Mixed, default: null })
    response_schema: MongooseSchema.Types.Mixed;
}

export const EntitiesTypesSchema = SchemaFactory.createForClass(EntitiesTypes);
