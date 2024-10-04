import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Categories {
  @Prop({ type: String, required: true })
  title: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
