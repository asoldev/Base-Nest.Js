import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Timestamps {
  @Prop({ type: Boolean, default: true })
  is_active: boolean;

  @Prop({ type: Date, default: Date.now })
  created_at?: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at?: Date;
}

export const TimestampsSchema = SchemaFactory.createForClass(Timestamps);
