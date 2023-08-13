import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { WalletService } from '../../wallet/services/wallet.service';
import { UserService } from '../../user/services/User.service';
import { TokenService } from '../../token/services/token.service';
import { InlineKeyboard, WalletBalanceResponse } from 'src/@types/constants';

@Injectable()
export class BotService {
  private botToken = this.configService.get<string>('bot.key');
  private bot: TelegramBot;

  constructor(
    private configService: ConfigService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
    this.bot = new TelegramBot(this.botToken, { polling: true });

    this.initializeBot();
    this.botMenu();
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
      await this.userService.logUser(userDetails);
      const response = await this.userService.generateProfile(id);
      this.bot.sendMessage(id, response);
    });
  }

  private botMenu() {
    this.bot.onText(/^\/menu$/i, async (message: any) => {
      const telegramId = message.chat.id;
      const response = await this.walletService.generateTradeWallets(
        telegramId,
      );

      const options = {
        reply_markup: JSON.stringify(InlineKeyboard),
      };

      this.bot.sendMessage(telegramId, response, options);
    });
    this.callBackQuery();
  }

  private callBackQuery() {
    this.bot.on(
      'callback_query',
      async (query: { message: { chat: { id: any } }; data: any }) => {
        const chatId = query.message.chat.id;
        const callbackData = query.data;

        if (callbackData === 'buy_tokens') {
        } else if (callbackData === 'token_balance') {
          const response = await this.tokenService.tokenBalance();
          const result = WalletBalanceResponse();
          this.bot.sendMessage(chatId, result);
        }
      },
    );
  }
}
