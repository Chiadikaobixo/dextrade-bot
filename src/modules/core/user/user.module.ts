import { Module } from '@nestjs/common';
import { UserService } from './services/User.service';
import { User, UsersSchema } from 'src/schemas/user.schema';
import { WalletService } from '../wallet/services/wallet.service';
import { Wallet, WalletsSchema } from 'src/schemas/wallet.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UsersSchema },
      { name: Wallet.name, schema: WalletsSchema },
    ]),
  ],
  controllers: [],
  providers: [UserService, WalletService],
})
export class UserModule {}
