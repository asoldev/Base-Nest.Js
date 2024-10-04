import { Prop } from "@nestjs/mongoose";
import { Expose } from "class-transformer";

export class Pipedrive {
  @Expose()
  @Prop({ type: String, required: false, default: null })
  pipedrive_id: string;

  @Expose()
  @Prop({ type: String, required: false, default: null })
  pipedrive_by: string;
}
