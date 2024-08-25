import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum PERMISSION_ACTIONS {
    GET = 'GET',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    FULL = 'FULL',
}

@Schema()
export class Permissions {
    @Prop({ type: String, required: true })
    key: string;

    @Prop({ type: Array<PERMISSION_ACTIONS>, required: true })
    value: PERMISSION_ACTIONS[];
}
