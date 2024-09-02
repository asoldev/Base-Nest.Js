import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { COLLECTION_NAME } from "../enum/collection-name.enum";

export enum PERMISSION_ACTIONS {
    GET = "GET",
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}

@Schema()
export class Permissions {
    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    @Prop({ type: Types.ObjectId, required: true, ref: COLLECTION_NAME.ENTITIES_TYPE })
    entities_types: Types.ObjectId;

    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    @Prop({ type: Array<PERMISSION_ACTIONS>, required: true })
    action: PERMISSION_ACTIONS[];
}
