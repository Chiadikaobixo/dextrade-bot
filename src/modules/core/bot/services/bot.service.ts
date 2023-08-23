import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { WalletService } from '../../wallet/services/wallet.service';
import { UserService } from '../../user/services/User.service';
import { TokenService } from '../../token/services/token.service';
import {
  MenuInlineKeyboard,
  PrivateKeyInlineKeyboard,
  ReplaceWallet,
  ReplaceWalletInlineKeyboard,
  SettingsInlineKeyboard,
  ViewPrivateKeyWarning,
  WalletBalanceResponse,
  WalletPrivateKey,
  WalletPrivateKeyInlineKeyboard,
} from 'src/@types/constants';

@Injectable()
export class BotService {
  private botToken = this.configService.get<string>('bot.key');
  private bot: TelegramBot;
  userMessageId: number[];

  constructor(
    private configService: ConfigService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
    this.bot = new TelegramBot(this.botToken, { polling: true });
    this.userMessageId = [];
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
        this.userMessageId.push(sentMessage.message_id);
      });
    this.settingsCallBackQuery();
  }

  private replaceWallet(telegramId: string) {
    const response = ReplaceWallet();
    const options = {
      reply_markup: JSON.stringify(ReplaceWalletInlineKeyboard),
    };
    this.bot
      .sendMessage(telegramId, response, options)
      .then((sentMessage: any) => {
        this.userMessageId.push(sentMessage.message_id);
      });
    this.walletCallBackQuery();
  }

  private walletPrivateKey(telegramId: string) {
    const response = WalletPrivateKey();
    const options = {
      reply_markup: JSON.stringify(WalletPrivateKeyInlineKeyboard),
    };
    this.bot
      .sendMessage(telegramId, response, options)
      .then((sentMessage: any) => {
        this.userMessageId.push(sentMessage.message_id);
      });
    this.walletPrivateKeyCallBackQuery();
  }

  private viewWalletPrivateKey(telegramId: string) {
    const response = ViewPrivateKeyWarning();
    const options = {
      reply_markup: JSON.stringify(PrivateKeyInlineKeyboard),
    };
    this.bot
      .sendMessage(telegramId, response, options)
      .then((sentMessage: any) => {
        this.userMessageId.push(sentMessage.message_id);
      });
    this.viewWalletPrivateKeyCallBackQuery();
  }

  private close(telegramId: string, messageId: number) {
    for (const id of this.userMessageId) {
      if (id === messageId) {
        this.bot.deleteMessage(telegramId, messageId);
        const messageIdIndex = this.userMessageId.indexOf(messageId);
        this.userMessageId.splice(messageIdIndex, 1);
      }
    }
  }

  private menuCallBackQuery() {
    this.bot.on('callback_query', async (query: any) => {
      const telegramId = query.message.chat.id;
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
          this.botSettings(telegramId);
          break;
        default:
          break;
      }
      if (result !== undefined) {
        this.bot.sendMessage(telegramId, result);
      }
    });
  }

  private settingsCallBackQuery() {
    this.bot.on('callback_query', async (query: any) => {
      const messageId = query.message.message_id;
      const telegramId = query.message.chat.id;
      const callbackData = query.data;

      switch (callbackData) {
        case 'main_menu':
          this.sendTradeWallets(telegramId);
          break;
        case 'close':
          this.close(telegramId, messageId);
          break;
        case 'replace_wallet':
          this.replaceWallet(telegramId);
          break;
        case 'import_wallet':
          break;
        case 'private_key':
          this.viewWalletPrivateKey(telegramId);
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
      const messageId = query.message.message_id;
      const telegramId = query.message.chat.id;
      const callbackData = query.data;

      switch (callbackData) {
        case 'wallet_1':
          await this.walletService.replaceWallet(telegramId, 0);
          await this.sendTradeWallets(telegramId);
          this.walletPrivateKey(telegramId);
          break;
        case 'wallet_2':
          await this.walletService.replaceWallet(telegramId, 1);
          await this.sendTradeWallets(telegramId);
          this.walletPrivateKey(telegramId);
          break;
        case 'wallet_3':
          await this.walletService.replaceWallet(telegramId, 2);
          await this.sendTradeWallets(telegramId);
          this.walletPrivateKey(telegramId);
          break;
        case 'close_wallet':
          this.close(telegramId, messageId);
          break;
        default:
          break;
      }
    });
  }

  private walletPrivateKeyCallBackQuery() {
    this.bot.on('callback_query', async (query: any) => {
      const messageId = query.message.message_id;
      const telegramId = query.message.chat.id;
      const callbackData = query.data;

      switch (callbackData) {
        case 'private_keys':
          this.viewWalletPrivateKey(telegramId);
          break;
        case 'close_private_keys':
          this.close(telegramId, messageId);
          break;
        default:
          break;
      }
    });
  }

  private viewWalletPrivateKeyCallBackQuery() {
    this.bot.on('callback_query', async (query: any) => {
      const messageId = query.message.message_id;
      const telegramId = query.message.chat.id;
      const callbackData = query.data;

      switch (callbackData) {
        case 'view_private_keys':
          break;
        case 'regenerate_link':
          break;
        case 'closeview_private_keys':
          this.close(telegramId, messageId);
          break;
        default:
          break;
      }
    });
  }
}
