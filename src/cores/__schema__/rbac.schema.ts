import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Permissions extends Document {
  @Prop({ type: Array<String> })
  roles: [];

  @Prop({ type: MongooseSchema.Types.Mixed })
  permissions: MongooseSchema.Types.Mixed;

  @Prop({ type: MongooseSchema.Types.Mixed })
  grants: MongooseSchema.Types.Mixed;

  @Prop({ type: MongooseSchema.Types.Mixed })
  filters: MongooseSchema.Types.Mixed;
}

export const PermissionsSchema = SchemaFactory.createForClass(Permissions);
