import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletDetails, WelcomeMessage } from 'src/@types/constants';
import { Wallet } from 'src/entities/wallet.entity';
import { Repository } from 'typeorm';
import Web3 from 'web3';

@Injectable()
export class WalletService {
  public web3: Web3;
  private apikey = this.configService.get<string>('api.key');

  constructor(
    private configService: ConfigService,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {
    this.web3 = new Web3(this.apikey);
  }

  async generateTradeProfile(telegram_id: string) {
    const existingUser = await this.findWallet(telegram_id);
    if (existingUser) {
      return await this.generateTradeWallets(telegram_id);
    }
    const response = await this.generateTradeWallets(telegram_id);
    const message = WelcomeMessage + response;
    return message;
  }

  async generateTradeWallets(telegram_id: string) {
    const responseWallet = await this.findWallet(telegram_id);
    if (responseWallet) {
      return responseWallet;
    }
    for (let i = 0; i < 3; i++) {
      const wallet = this.web3.eth.accounts.create();
      const { address, privateKey } = wallet;

      const walletEntity = {
        telegram_id: telegram_id,
        wallet_address: address,
        wallet_private_key: privateKey,
      };
      const newWallet = this.walletRepository.create(walletEntity);
      await this.walletRepository.save(newWallet);
    }
    const response = await this.findWallet(telegram_id);
    return response;
  }

  async findWallet(telegram_id: string) {
    const walletExist = await this.walletRepository.find({
      where: [{ telegram_id }],
    });
    if (walletExist.length > 0) {
      const wallet = walletExist.map((wallet) => wallet.wallet_address);
      const response = WalletDetails(wallet);
      return response;
    }
  }
}
