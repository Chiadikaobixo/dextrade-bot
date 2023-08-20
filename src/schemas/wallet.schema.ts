import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WalletsDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true, collection: 'wallets' })
export class Wallet extends BaseSchema {
  @Prop({ type: String, required: true, maxlength: 100 })
  telegram_id: string;

  @Prop({ type: String, required: true, maxlength: 100 })
  wallet_address: string;

  @Prop({ type: String, required: true, maxlength: 100 })
  wallet_private_key: string;
}

export type WalletDocument = Wallet & Document;

export const WalletsSchema = SchemaFactory.createForClass(Wallet);