import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import Web3 from 'web3';
import { ConfigService } from '@nestjs/config';
import { WalletService } from '../../wallet/services/wallet.service';
import { UserService } from '../../user/services/User.service';

@Injectable()
export class BotService {
  public web3: Web3;
  private botToken = this.configService.get<string>('bot.key');
  private apikey = this.configService.get<string>('api.key');
  private bot: TelegramBot;

  constructor(
    private configService: ConfigService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
  ) {
    this.web3 = new Web3(this.apikey);
    this.bot = new TelegramBot(this.botToken, { polling: true });

    this.initializeBot();
    this.botWallet();
  }

  private initializeBot() {
    this.bot.onText(/^\/start$/i, async (message: any) => {
      const { id, first_name, last_name, username } = message.chat;
      const userDetails = {
        telegram_id: id,
        first_name,
        last_name,
        username,
      };
      this.userService.logUser(userDetails);

      this.bot.sendMessage(id, this.walletService.generateTradeProfile());
    });
  }

  private botWallet() {
    this.bot.onText(/^\/menu$/i, async (message: any) => {
      const chatId = message.chat.id;

      this.bot.sendMessage(chatId, this.walletService.generateTradeWallets());
    });
  }
}
