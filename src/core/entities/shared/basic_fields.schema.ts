import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { Document, Schema as mongoose } from "mongoose";
import { convertToSlug } from "../../../utils/convertToSlug.utils";
import { Pipedrive } from "./pipedive.schema";
import { Iggy } from "./iggy.schema";

export interface FormDataInterface {
  k: "website" | "size" | "logo" | "address"; // Only allow specific keys
  v: string; // value
}

export class BasicFields extends Document {
  @Expose()
  @Prop({ type: String, required: false })
  origin_id?: string;

  @Expose()
  @Prop({ type: String, required: true })
  title: string;

  @Expose()
  @Prop({ type: String, required: false, default: null })
  slug: string;

  @Expose()
  @Prop({ type: String, required: true })
  short_description: string;

  @Expose()
  @Prop({ type: String, required: false, default: null })
  long_description: string;

  @Expose()
  @Prop({
    type: Array<FormDataInterface>,
    required: true,
    default: null,
  })
  form_data: FormDataInterface;

  @Expose()
  @Prop({ type: mongoose.Types.Mixed, required: false, default: null })
  categories: mongoose.Types.Mixed;

  @Expose()
  @Prop({ type: Pipedrive, required: false })
  pipedrive: Pipedrive;

  @Expose()
  @Prop({ type: Iggy, required: false })
  iggy: Iggy;

  @Expose()
  @Prop({ type: Number, required: false, default: 1 })
  is_active: number;

  @Prop({ type: Date, default: Date.now })
  created_at?: Date;

  @Prop({ type: Date, default: Date.now })
  checked_at?: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at?: Date;
}
export const BasicFieldsSchema = SchemaFactory.createForClass(BasicFields);

BasicFieldsSchema.index({ origin_id: "desc" });
BasicFieldsSchema.index({ categories: "desc" });
BasicFieldsSchema.index({ created_at: "desc" });

BasicFieldsSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = convertToSlug(this.title);
  }
  next();
});
