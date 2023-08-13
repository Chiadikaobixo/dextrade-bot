import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';

@Injectable()
export class TokenService {
  public web3: Web3;
  private apikey = this.configService.get<string>('api.key');

  constructor(private configService: ConfigService) {
    this.web3 = new Web3(this.apikey);
  }

  async buyToken(buyerPrivateKey: any, amountEth: any) {
    const account = this.web3.accountProvider.privateKeyToAccount(buyerPrivateKey)
  }

  async sellToken() {}

  async tokenBalance(){

  }
}
