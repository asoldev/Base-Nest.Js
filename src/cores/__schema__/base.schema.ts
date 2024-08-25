import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export abstract class Base extends Document {
    @Prop({ type: Boolean, default: true })
    is_active: boolean;

    @Prop({ type: Date, default: Date.now })
    created_at?: Date;

    @Prop({ type: Date, default: Date.now })
    updated_at?: Date;
}
