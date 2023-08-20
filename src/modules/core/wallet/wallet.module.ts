import { Module } from '@nestjs/common';
import { WalletService } from './services/wallet.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletsSchema } from 'src/schemas/wallet.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletsSchema }]),
  ],
  controllers: [],
  providers: [WalletService],
})
export class WalletModule {}
