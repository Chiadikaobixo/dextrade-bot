import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { WalletService } from '../../wallet/services/wallet.service';
import { UserService } from '../../user/services/User.service';
import { TokenService } from '../../token/services/token.service';
import {
  ImportWalletInlineKeyboard,
  ImportWalletWarning,
  MenuInlineKeyboard,
  PrivateKeyInlineKeyboard,
  ReplaceWallet,
  ReplaceWalletInlineKeyboard,
  SettingsInlineKeyboard,
  SettingsMessage,
  TransferEthInlineKeyboard,
  TransferEthMessage,
  ViewPrivateKeyWarning,
  WalletBalanceResponse,
  WalletPrivateKey,
  WalletPrivateKeyInlineKeyboard,
} from 'src/@types/constants';
import { EAmountInEth, ECollum, ITransferInfo } from 'src/@types/interface';

@Injectable()
export class BotService {
  private botToken = this.configService.get<string>('bot.key');
  private bot: TelegramBot;
  userMessageId: number[];
  transferEthFrom: number[];
  transferEthTo: number[];
  transferEthAmount: number[];

  constructor(
    private configService: ConfigService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
    this.bot = new TelegramBot(this.botToken, { polling: true });
    this.userMessageId = [];
    this.transferEthFrom = [];
    this.transferEthTo = [];
    this.transferEthAmount = [];

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
    const response = SettingsMessage();
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

  private importWallet(telegramId: string) {
    const response = ImportWalletWarning();
    const options = {
      reply_markup: JSON.stringify(ImportWalletInlineKeyboard),
    };
    this.bot
      .sendMessage(telegramId, response, options)
      .then((sentMessage: any) => {
        this.userMessageId.push(sentMessage.message_id);
      });
    this.importWalletCallBackQuery();
  }

  private transferEth(telegramId: string) {
    const response = TransferEthMessage();
    const options = {
      reply_markup: JSON.stringify(TransferEthInlineKeyboard),
    };
    this.bot
      .sendMessage(telegramId, response, options)
      .then((sentMessage: any) => {
        this.userMessageId.push(sentMessage.message_id);
      });
    this.transferEthCallBackQuery();
  }

  private highlightedWallet(wallet: number, transferToorFrom: number) {
    switch (transferToorFrom) {
      case 1:
        if (this.transferEthFrom.length) {
          this.transferEthFrom = [];
          this.transferEthFrom.push(wallet);
        }
        this.transferEthFrom.push(wallet);
        break;
      case 2:
        if (this.transferEthTo.length) {
          this.transferEthTo = [];
          this.transferEthTo.push(wallet);
        }
        this.transferEthTo.push(wallet);
        break;
      default:
        break;
    }
  }

  private highlightedAmount(ethAmount: number) {
    switch (ethAmount) {
      case 1:
        if (this.transferEthAmount.length) {
          this.transferEthAmount = [];
          this.transferEthAmount.push(EAmountInEth.Wallet1);
        }
        this.transferEthAmount.push(EAmountInEth.Wallet1);
        break;
      case 2:
        if (this.transferEthAmount.length) {
          this.transferEthAmount = [];
          this.transferEthAmount.push(EAmountInEth.Wallet2);
        }
        this.transferEthAmount.push(EAmountInEth.Wallet2);
        break;
      case 3:
        if (this.transferEthAmount.length) {
          this.transferEthAmount = [];
          this.transferEthAmount.push(EAmountInEth.Wallet3);
        }
        this.transferEthAmount.push(EAmountInEth.Wallet3);
        break;
      default:
        break;
    }
  }

  private async sendEth(telegramId: string) {
    if (!this.transferEthFrom.length || !this.transferEthTo.length) return;
    if (!this.transferEthAmount) return;
    const userWallets = await this.walletService.findWallet(telegramId);
    const sendingWallet = userWallets[this.transferEthFrom[0] - 1];
    const sendingWalletPrivateKey = await this.walletService.findWalletPrivateKey(telegramId, sendingWallet)
    const receivingWallet = userWallets[this.transferEthTo[0] - 1];

    const trx: ITransferInfo = {
      fromAddress: sendingWallet,
      toAddress: receivingWallet,
      amountInEther: this.transferEthAmount[0],
      privateKey: sendingWalletPrivateKey[0]
    }
    
    this.tokenService.transferEth(trx)
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
          this.importWallet(telegramId);
          break;
        case 'private_key':
          this.viewWalletPrivateKey(telegramId);
          break;
        case 'transfer_eth':
          this.transferEth(telegramId);
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

  private importWalletCallBackQuery() {
    this.bot.on('callback_query', async (query: any) => {
      const messageId = query.message.message_id;
      const telegramId = query.message.chat.id;
      const callbackData = query.data;

      switch (callbackData) {
        case 'import_wallet_import_wallet':
          break;
        case 'regenerate_link_import_wallet':
          break;
        case 'close_import_wallet':
          this.close(telegramId, messageId);
          break;
        default:
          break;
      }
    });
  }

  private transferEthCallBackQuery() {
    this.bot.on('callback_query', async (query: any) => {
      const messageId = query.message.message_id;
      const telegramId = query.message.chat.id;
      const callbackData = query.data;
      const transferFrom = 1;
      const transferTo = 2;

      switch (callbackData) {
        case 'tf_main_menu':
          this.sendTradeWallets(telegramId);
          break;
        case 'tf_close':
          this.close(telegramId, messageId);
          break;
        case 'tf_wallet_1':
          this.highlightedWallet(ECollum.Index1, transferFrom);
          break;
        case 'tf_wallet_2':
          this.highlightedWallet(ECollum.Index2, transferFrom);
          break;
        case 'tf_wallet_3':
          this.highlightedWallet(ECollum.Index3, transferFrom);
          break;
        case 'tt_wallet_1':
          this.highlightedWallet(ECollum.Index1, transferTo);
          break;
        case 'tt_wallet_2':
          this.highlightedWallet(ECollum.Index2, transferTo);
          break;
        case 'tt_wallet_3':
          this.highlightedWallet(ECollum.Index3, transferTo);
          break;
        case 'costum':
          break;
        case 'eth_amount_1':
          this.highlightedAmount(ECollum.Index1);
          break;
        case 'eth_amount_2':
          this.highlightedAmount(ECollum.Index2);
          break;
        case 'eth_amount_3':
          this.highlightedAmount(ECollum.Index3);
          break;
        case 'costum_eth':
          break;
        case 'all_eth':
          break;
        case 'send_transfer':
          this.sendEth(telegramId);
          break;
        default:
          break;
      }
    });
  }
}
