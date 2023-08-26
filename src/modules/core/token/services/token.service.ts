import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITransferInfo } from 'src/@types/interface';
import Web3 from 'web3';

@Injectable()
export class TokenService {
  public web3: Web3;
  private apikey = this.configService.get<string>('api.key');

  constructor(private configService: ConfigService) {
    this.web3 = new Web3(this.apikey);
  }

  async buyToken(buyerPrivateKey: any, amountEth: any) {
    const account =
      this.web3.accountProvider.privateKeyToAccount(buyerPrivateKey);
  }

  async sellToken() {}

  async tokenBalance() {}

  async transferEth(transferInfo: ITransferInfo) {
    try {
      const nonce = await this.web3.eth.getTransactionCount(
        transferInfo.fromAddress,
      );
      const gasPrice = await this.web3.eth.getGasPrice();
      const gasLimit = 21000;
      const valueInWei = this.web3.utils.toWei(
        transferInfo.amountInEther.toString(),
        'ether',
      );

      const txObject = {
        nonce: this.web3.utils.toHex(nonce),
        to: transferInfo.toAddress,
        value: this.web3.utils.toHex(valueInWei),
        gasPrice: this.web3.utils.toHex(gasPrice),
        gasLimit: this.web3.utils.toHex(gasLimit),
      };

      const signedTransaction = await this.web3.eth.accounts.signTransaction(
        txObject,
        transferInfo.privateKey,
      );
      const transactionReceipt = await this.web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction,
      );

    } catch (error) {
    }
  }
}
