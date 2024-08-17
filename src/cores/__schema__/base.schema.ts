import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User extends Document {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String, required: true })
  last_name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: [String] })
  roles: string[];

  @Prop({ type: String })
  refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
