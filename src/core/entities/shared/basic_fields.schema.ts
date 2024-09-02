import { Prop } from "@nestjs/mongoose";
import { Expose, Transform } from "class-transformer";
import { Types } from "mongoose";
import { SchemaFields } from "./schema_fields.schema";

export class BasicFields extends SchemaFields {
    @Expose()
    @Transform(({ key, obj }) => obj[key])
    _id?: Types.ObjectId;

    @Expose()
    @Prop()
    title: string;

    @Expose()
    @Prop()
    slug: string;

    @Expose()
    @Prop()
    status: number;

    @Expose()
    @Prop({ type: Boolean, default: true })
    is_active: boolean;

    @Prop({ type: Date, default: Date.now })
    created_at?: Date;

    @Prop({ type: Date, default: Date.now })
    updated_at?: Date;
}
