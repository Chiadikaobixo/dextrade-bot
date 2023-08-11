import { Module } from '@nestjs/common';
import { BotService } from './services/bot.service';
import { WalletService } from '../wallet/services/wallet.service';
import { UserService } from '../user/services/User.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Wallet } from 'src/entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet])],
  controllers: [],
  providers: [BotService, WalletService, UserService],
})
export class BotModule {}
