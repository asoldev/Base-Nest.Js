import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { Schema as MongooseSchema } from "mongoose";
import { COLLECTION_NAME } from "./enum/collection-name.enum";
import { BasicFields } from "./shared/basic_fields.schema";
import { Language } from "./shared/language.schema";
import { SchemaFields } from "./shared/schema_fields.schema";

class LanguageEntitiesTypes extends Language {
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
}

@Schema({ collection: COLLECTION_NAME.ENTITIES_TYPE })
export class EntitiesTypes extends SchemaFields {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Prop({ required: true })
    type: string;

    @Prop({ type: Array<LanguageEntitiesTypes>, required: true })
    languages: LanguageEntitiesTypes[];

    @Expose()
    @Prop({ type: MongooseSchema.Types.Mixed, default: null })
    response_schema: MongooseSchema.Types.Mixed;
}

export const EntitiesTypesSchema = SchemaFactory.createForClass(EntitiesTypes);
