import { Module } from '@nestjs/common';
import { WalletService } from './services/wallet.service';
import { ConfigModule } from '@nestjs/config';
import { Wallet } from 'src/entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Wallet])],
  controllers: [],
  providers: [WalletService],
})
export class WalletModule {}
