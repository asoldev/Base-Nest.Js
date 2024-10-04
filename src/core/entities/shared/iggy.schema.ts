import { Prop } from "@nestjs/mongoose";
import { Expose } from "class-transformer";

export class Iggy {
  @Expose()
  @Prop({ type: String, required: false, default: null })
  iggy_id: string;
}
