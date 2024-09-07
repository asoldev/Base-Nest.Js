import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { COLLECTION_NAME } from "./enum/collection-name.enum";
import { User } from "./user.schema";

@Schema({ collection: COLLECTION_NAME.MEDIA })
export class Media {
    @Prop({ type: Types.ObjectId, ref: COLLECTION_NAME.USER })
    created_by: User;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    alt: string;

    @Prop({ required: true })
    file_name: string;

    @Prop({ required: true })
    disk: string;

    @Prop({ required: true })
    path: string;

    @Prop({ required: true })
    mime: string;

    @Prop({ required: true })
    size: number;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
