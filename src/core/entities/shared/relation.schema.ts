import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { Types } from "mongoose";
import { Categories } from "../categories.schema";
import { EntitiesTypes } from "../entities_types.schema";
import { COLLECTION_NAME } from "../enum/collection-name.enum";
import { Posts } from "../posts.schema";
import { BasicFields } from "./basic_fields.schema";

class RelationField {
    @Expose()
    @Prop({ type: Array<Types.ObjectId>, required: false, default: [], ref: COLLECTION_NAME.CATEGORIES })
    categories: Categories[];

    @Expose()
    @Prop({ type: Array<Types.ObjectId>, required: false, default: [], ref: COLLECTION_NAME.POSTS })
    posts: Posts[];
}

export class RelationFields extends BasicFields {
    @Expose()
    @Prop({ type: Types.ObjectId, required: true, ref: COLLECTION_NAME.CHANNEL })
    channel_id: Types.ObjectId;

    @Expose()
    @Prop({ type: Types.ObjectId, required: true, ref: COLLECTION_NAME.ENTITIES_TYPE })
    entities_types: EntitiesTypes;

    @Expose()
    @Prop({ type: RelationField })
    relations: RelationField;

    @Expose()
    @Prop({ type: Array<Types.ObjectId>, required: false, default: [], ref: COLLECTION_NAME.ENTITIES_TYPE })
    relations_entities_types: EntitiesTypes[];
}
export const RelationFieldsSchema = SchemaFactory.createForClass(RelationFields);
