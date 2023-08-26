export interface IUserDetails {
  telegram_id: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface ITransferInfo {
  fromAddress: string;
  toAddress: string;
  amountInEther: number;
  privateKey: string;
}

export enum EAmountInEth {
  Wallet1 = 0.1,
  Wallet2 = 0.3,
  Wallet3 = 0.5,
}

export enum ECollum {
  Index1 = 1,
  Index2 = 2,
  Index3 = 3,
}
