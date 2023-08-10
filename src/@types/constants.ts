export const WelcomeMessage = `Welcome to dextrade. You are now registered and have been assigned new wallets. Fund the wallets provided to start swapping and snipping`;
export const WalletDetails = (wallet: any[]) => {
  const message = `
   
  🦄 DexTradeBot ⬩ Elite Dex Sniper ⬩ Website 🦄
    ⬩Gas: 27 GWEI ⬩Block: 17830400 ⬩ETH: $1836
    Snipe & swap at elite speeds for free. Uniswap v2 and v3 are supported.
    
    ═══ Your Wallets ═══
    ▰ Wallet⬩w1
    Balance: 0.0 ETH ⬩ $0
    Transactions: 0
    Address: ${wallet[0]}
    
    ▰ Wallet⬩w2
    Balance: 0.0 ETH ⬩ $0
    Transactions: 0
    Address: ${wallet[1]}
    
    ▰ Wallet⬩w3
    Balance: 0.0 ETH ⬩ $0
    Transactions: 0
    Address: ${wallet[2]}`;

  return message;
};
