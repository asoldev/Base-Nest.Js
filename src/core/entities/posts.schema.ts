import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { COLLECTION_NAME } from "./enum/collection-name.enum";
import { RelationFields } from "./shared/relation.schema";

@Schema({ collection: COLLECTION_NAME.POSTS })
export class Posts extends RelationFields {}

export const PostsSchema = SchemaFactory.createForClass(Posts);
