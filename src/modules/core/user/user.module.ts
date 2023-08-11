import { Module } from '@nestjs/common';
import { UserService } from './services/User.service';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletService } from '../wallet/services/wallet.service';
import { Wallet } from 'src/entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet])],
  controllers: [],
  providers: [UserService, WalletService],
})
export class UserModule {}
