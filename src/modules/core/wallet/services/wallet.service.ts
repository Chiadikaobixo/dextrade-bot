import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalletDetails } from 'src/@types/constants';
import { Wallet, WalletsDocument } from 'src/schemas/wallet.schema';
import Web3 from 'web3';

@Injectable()
export class WalletService {
  public web3: Web3;
  private apikey = this.configService.get<string>('api.key');

  constructor(
    private configService: ConfigService,
    @InjectModel(Wallet.name)
    private readonly walletRepository: Model<WalletsDocument>,
  ) {
    this.web3 = new Web3(this.apikey);
  }

  async generateTradeWallets(telegram_id: string) {
    const userWallet = await this.findWallet(telegram_id);
    if (userWallet) {
      const walletBallance = await this.getWalletBalance(telegram_id);
      const walletResult = WalletDetails(userWallet, walletBallance);
      return walletResult;
    }

    for (let i = 0; i < 3; i++) {
      const wallet = this.web3.eth.accounts.create();
      const { address, privateKey } = wallet;
      const walletEntity = {
        telegram_id: telegram_id,
        wallet_address: address,
        wallet_private_key: privateKey,
      };
      await this.walletRepository.create(walletEntity);
    }
    const result = await this.findWallet(telegram_id);
    const response = WalletDetails(result);
    return response;
  }

  async findWallet(telegram_id: string) {
    const walletExist = await this.walletRepository.find({
      telegram_id,
    });
    if (walletExist.length > 0) {
      const wallet = walletExist.map((wallet) => wallet.wallet_address);
      return wallet;
    }
  }

  async findWalletPrivateKey(telegram_id: string, wallet_address: string) {
    try {
      const walletExist = await this.walletRepository.find({
        telegram_id,
        wallet_address,
      });
      const walletPrivateKey = walletExist.map(
        (wallet) => wallet.wallet_private_key,
      );
      return walletPrivateKey;
    } catch (error) {}
  }

  async replaceWallet(telegram_id: string, walletIndex: number) {
    const userWallet = await this.walletRepository.find({
      telegram_id,
    });
    if (!userWallet) return;

    const { _id } = userWallet[walletIndex];

    const wallet = this.web3.eth.accounts.create();
    const { address, privateKey } = wallet;

    await this.walletRepository.findOneAndUpdate(_id, {
      wallet_address: address,
      wallet_private_key: privateKey,
    });
  }

  async getWalletBalance(telegramId: string) {
    const returnedWallet = await this.findWallet(telegramId);
    if (!returnedWallet)
      throw new NotFoundException('[NOT FOUND]: Wallet not found');

    const allWallet = returnedWallet.map(async (walletAddress) => {
      const balanceWei = await this.web3.eth.getBalance(walletAddress);
      const balanceEth = this.web3.utils.fromWei(balanceWei, 'ether');
      return balanceEth;
    });
    const walletResponse = await Promise.all(allWallet);
    return walletResponse;
  }
}
