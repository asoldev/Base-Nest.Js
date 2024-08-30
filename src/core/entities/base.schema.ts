import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Expose, Transform } from "class-transformer";

export class BaseEntity {
    @Expose()
    @Transform(({ key, obj }) => obj[key])
    _id?: string;

    @Expose()
    @Prop({ type: Boolean, default: true })
    is_active: boolean;

    @Prop({ type: Date, default: Date.now })
    created_at?: Date;

    @Prop({ type: Date, default: Date.now })
    updated_at?: Date;
}
export const BaseEntitySchema = SchemaFactory.createForClass(BaseEntity);
