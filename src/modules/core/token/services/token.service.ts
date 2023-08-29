import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, providers } from 'ethers';
import { ITransferInfo } from 'src/@types/interface';

@Injectable()
export class TokenService {
  private apikey = this.configService.get<string>('api.key');
  public provider: providers.JsonRpcProvider | ethers.providers.Provider;

  constructor(private configService: ConfigService) {
    this.provider = new ethers.providers.JsonRpcProvider(this.apikey);
  }

  async buyToken(buyerPrivateKey: any, amountEth: any) {
    const account = new ethers.Wallet(buyerPrivateKey);
  }

  async sellToken() {}

  async tokenBalance() {}

  async transferEth(transferInfo: ITransferInfo) {
    try {
      const nonce = await this.provider.getTransactionCount(transferInfo.fromAddress);
      const gasPrice = ethers.utils.parseUnits('20', 'gwei');
      const gasLimit = ethers.BigNumber.from('21000');
      const valueInWei = ethers.utils.parseEther(transferInfo.amountInEther.toString());

      const txObject = {
        nonce: nonce,
        to: transferInfo.toAddress,
        value: valueInWei,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
      };

      const wallet = new ethers.Wallet(transferInfo.privateKey, this.provider);
      const signedTransaction = await wallet.signTransaction(txObject);

      const transactionResponse = await this.provider.sendTransaction(signedTransaction);
      console.log('Transaction Hash:', transactionResponse);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

}
