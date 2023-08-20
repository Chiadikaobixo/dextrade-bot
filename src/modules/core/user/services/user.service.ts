import { Injectable } from '@nestjs/common';
import { IUserDetails } from 'src/@types/interface';
import { User, UsersDocument } from 'src/schemas/user.schema';
import { WalletService } from '../../wallet/services/wallet.service';
import { WelcomeMessage } from 'src/@types/constants';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

Injectable();
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<UsersDocument>,
    private readonly walletService: WalletService,
  ) {}

  async logUser(user: IUserDetails) {
    const userExist = await this.userRepository.find({
      telegram_id: user.telegram_id,
    });
    if (userExist.length > 0) return;

    const userEntity = {
      telegram_id: user.telegram_id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
    };
    const newLoggedUser = await this.userRepository.create(userEntity);
    return newLoggedUser;
  }

  async generateProfile(telegram_id: string) {
    const existingUser = await this.walletService.findWallet(telegram_id);
    if (existingUser) {
      return await this.walletService.generateTradeWallets(telegram_id);
    }
    const response = await this.walletService.generateTradeWallets(telegram_id);
    const message = WelcomeMessage + response;
    return message;
  }
}
