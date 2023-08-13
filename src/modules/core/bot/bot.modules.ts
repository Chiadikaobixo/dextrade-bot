import { Module } from '@nestjs/common';
import { BotService } from './services/bot.service';
import { WalletService } from '../wallet/services/wallet.service';
import { UserService } from '../user/services/User.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Wallet } from 'src/entities/wallet.entity';
import { TokenService } from '../token/services/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet])],
  controllers: [],
  providers: [BotService, WalletService, UserService, TokenService],
})
export class BotModule {}
