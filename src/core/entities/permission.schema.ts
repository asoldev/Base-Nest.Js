import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

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
    @Prop({ type: String, required: true })
    key: string;

    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    @Prop({ type: Array<PERMISSION_ACTIONS>, required: true })
    value: PERMISSION_ACTIONS[];
}
