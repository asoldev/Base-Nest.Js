import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { COLLECTION_NAME } from "./enum/collection-name.enum";
import { RelationFields } from "./shared/relation.schema";

@Schema({ collection: COLLECTION_NAME.CATEGORIES })
export class Categories extends RelationFields {
    @Prop({ type: Types.ObjectId, required: false, default: null })
    parent_id: Types.ObjectId;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
