import { BaseSchema } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User extends BaseSchema {
  @Prop({ type: String, required: true, maxlength: 100 })
  telegram_id: string;

  @Prop({ type: String, maxlength: 100 })
  first_name: string;

  @Prop({ type: String, maxlength: 100 })
  last_name: string;

  @Prop({ type: String, maxlength: 100 })
  username: string;
}

export type UserDocument = User & Document;

export const UsersSchema = SchemaFactory.createForClass(User);