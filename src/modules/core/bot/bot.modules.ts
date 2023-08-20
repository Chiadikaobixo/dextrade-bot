import { Module } from '@nestjs/common';
import { BotService } from './services/bot.service';
import { WalletService } from '../wallet/services/wallet.service';
import { UserService } from '../user/services/User.service';
import { User, UsersSchema } from 'src/schemas/user.schema';
import { Wallet, WalletsSchema } from 'src/schemas/wallet.schema';
import { TokenService } from '../token/services/token.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UsersSchema },
      { name: Wallet.name, schema: WalletsSchema },
    ]),
  ],
  controllers: [],
  providers: [BotService, WalletService, UserService, TokenService],
  exports: [MongooseModule]
})
export class BotModule {}
