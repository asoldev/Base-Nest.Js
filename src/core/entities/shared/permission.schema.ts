import { Prop } from "@nestjs/mongoose/dist/decorators/prop.decorator";
import { Schema } from "@nestjs/mongoose/dist/decorators/schema.decorator";
import { Expose } from "class-transformer/types/decorators/expose.decorator";
import { COLLECTION_NAME } from "../enum/collection-name.enum";
import { Types } from "mongoose";
import { IsNotEmpty } from "class-validator";

export enum PERMISSION_ACTIONS {
  GET = "GET",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

@Schema()
export class Permissions {
  @Expose()
  @IsNotEmpty()
  @Prop({ type: Array<PERMISSION_ACTIONS>, required: true })
  action: PERMISSION_ACTIONS[];
}
