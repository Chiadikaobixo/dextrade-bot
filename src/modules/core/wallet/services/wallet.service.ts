import { Injectable } from '@nestjs/common';
import { WelcomeMessage } from 'src/@types/constants';

@Injectable()
export class WalletService {
  constructor() {}

  generateTradeProfile() {
    return WelcomeMessage;
  }

  generateTradeWallets() {
    return 'Trade walletsssssssss';
  }
}
