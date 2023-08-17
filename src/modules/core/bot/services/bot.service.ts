import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { WalletService } from '../../wallet/services/wallet.service';
import { UserService } from '../../user/services/User.service';
import { TokenService } from '../../token/services/token.service';
import {
  MenuInlineKeyboard,
  SettingsInlineKeyboard,
  WalletBalanceResponse,
} from 'src/@types/constants';

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
        reply_markup: JSON.stringify(MenuInlineKeyboard),
      };
      this.bot.sendMessage(telegramId, response, options);
    });

    this.menuCallBackQuery();
  }

  private botSettings(telegramId: string) {
    const response = 'Settings';
    const options = {
      reply_markup: JSON.stringify(SettingsInlineKeyboard),
    };
    this.bot.sendMessage(telegramId, response, options);
  }

  private menuCallBackQuery() {
    this.bot.on('callback_query', async (query: any) => {
      const chatId = query.message.chat.id;
      const callbackData = query.data;

      let result: string | undefined;

      switch (callbackData) {
        case 'buy_tokens':
          return;
        case 'sell_tokens':
          return;
        case 'buy_limit':
          return;
        case 'sell_limi':
          return;
        case 'copy_trade':
          return;
        case 'method_sniper':
          return;
        case 'token_balance':
          const response = await this.tokenService.tokenBalance();
          result = WalletBalanceResponse();
          return;
        case 'pnl_analysis':
          return;
        case 'settings':
          this.botSettings(chatId);
          return;
        default:
          break;
      }
      if (result !== undefined) {
        this.bot.sendMessage(chatId, result);
      }
    });
  }
}
