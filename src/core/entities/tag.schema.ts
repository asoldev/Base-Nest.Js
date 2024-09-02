import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { COLLECTION_NAME } from "./enum/collection-name.enum";
import { RelationFields } from "./shared/relation.schema";

@Schema({ collection: COLLECTION_NAME.TAGS })
export class Tags extends RelationFields {}

export const TagsSchema = SchemaFactory.createForClass(Tags);
