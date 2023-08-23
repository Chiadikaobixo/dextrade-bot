import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { WalletService } from '../../wallet/services/wallet.service';
import { UserService } from '../../user/services/User.service';
import { TokenService } from '../../token/services/token.service';
import {
  MenuInlineKeyboard,
  ReplaceWallet,
  ReplaceWalletInlineKeyboard,
  SettingsInlineKeyboard,
  WalletBalanceResponse,
} from 'src/@types/constants';

@Injectable()
export class BotService {
  private botToken = this.configService.get<string>('bot.key');
  private bot: TelegramBot;
  settingsMessageId: number;

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
      const options = {
        reply_markup: JSON.stringify(MenuInlineKeyboard),
      };
      this.bot.sendMessage(id, response, options);
    });
  }

  private botMenu() {
    this.bot.onText(/^\/menu$/i, async (message: any) => {
      const telegramId = message.chat.id;
      this.sendTradeWallets(telegramId);
    });
    this.menuCallBackQuery();
  }

  private async sendTradeWallets(telegramId: string) {
    const response = await this.walletService.generateTradeWallets(telegramId);
    const options = {
      reply_markup: JSON.stringify(MenuInlineKeyboard),
    };
    this.bot.sendMessage(telegramId, response, options);
  }

  private botSettings(telegramId: string) {
    const response = 'Settings';
    const options = {
      reply_markup: JSON.stringify(SettingsInlineKeyboard),
    };
    this.bot
      .sendMessage(telegramId, response, options)
      .then((sentMessage: any) => {
        this.settingsMessageId = sentMessage.message_id;
      });
    this.settingsCallBackQuery();
  }

  private replaceWallet(telegramId: string) {
    const response = ReplaceWallet();
    const options = {
      reply_markup: JSON.stringify(ReplaceWalletInlineKeyboard),
    };
    this.bot.sendMessage(telegramId, response, options);
    this.walletCallBackQuery();
  }

  private menuCallBackQuery() {
    this.bot.on('callback_query', async (query: any) => {
      const chatId = query.message.chat.id;
      const callbackData = query.data;

      let result: string | undefined;

      switch (callbackData) {
        case 'buy_tokens':
          break;
        case 'sell_tokens':
          break;
        case 'buy_limit':
          break;
        case 'sell_limit':
          break;
        case 'copy_trade':
          break;
        case 'method_sniper':
          break;
        case 'token_balance':
          const response = await this.tokenService.tokenBalance();
          result = WalletBalanceResponse();
          break;
        case 'pnl_analysis':
          break;
        case 'settings':
          this.botSettings(chatId);
          break;
        default:
          break;
      }
      if (result !== undefined) {
        this.bot.sendMessage(chatId, result);
      }
    });
  }

  private settingsCallBackQuery() {
    this.bot.on('callback_query', async (query: any) => {
      const telegramId = query.message.chat.id;
      const callbackData = query.data;

      switch (callbackData) {
        case 'main_menu':
          this.sendTradeWallets(telegramId);
          break;
        case 'close':
          if (this.settingsMessageId) {
            this.bot.deleteMessage(telegramId, this.settingsMessageId);
            this.settingsMessageId = null;
          }
          break;
        case 'replace_wallet':
          this.replaceWallet(telegramId);
          break;
        case 'import_wallet':
          break;
        case 'private_key':
          break;
        case 'transfer_eth':
          break;
        case 'set_password':
          break;
        case 'link_wallet':
          break;
        case 'hide_tooltips':
          break;
        default:
          break;
      }
    });
  }

  private walletCallBackQuery() {
    this.bot.on('callback_query', async (query: any) => {
      const telegramId = query.message.chat.id;
      const callbackData = query.data;

      switch (callbackData) {
        case 'wallet_1':
          break;
        case 'wallet_2':
          break;
        case 'wallet_3':
          break;
        case 'close_wallet':
          break;
        default:
          break;
      }
    });
  }
}
