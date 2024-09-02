import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { Document, Schema } from "mongoose";

export class SchemaFields extends Document {
    @Expose()
    @Prop({ type: Schema.Types.Mixed, default: null })
    form_data: Schema.Types.Mixed;

    @Expose()
    @Prop({ type: Schema.Types.Mixed, default: null })
    json_schema: Schema.Types.Mixed;

    @Expose()
    @Prop({ type: Schema.Types.Mixed, default: null })
    ui_schema: Schema.Types.Mixed;
}
export const SchemaFieldsSchema = SchemaFactory.createForClass(SchemaFields);
