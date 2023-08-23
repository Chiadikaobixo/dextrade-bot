export const WelcomeMessage = `Welcome to dextrade. You are now registered and have been assigned new wallets. Fund the wallets provided to start swapping and snipping`;
export const WalletDetails = (wallet: any[], walletBallance?: any[]) => {
  const message = `
   
  🦄 DexTradeBot ⬩ Elite Dex Sniper ⬩ Website 🦄
    ⬩Gas: 27 GWEI ⬩Block: 17830400 ⬩ETH: $1836
    Snipe & swap at elite speeds for free. Uniswap v2 and v3 are supported.
    
    ═══ Your Wallets ═══
    ▰ Wallet⬩w1
    Balance: ${walletBallance ? walletBallance[0] : '0.0'} ETH ⬩ $0
    Transactions: 0
    Address: ${wallet[0]}
    
    ▰ Wallet⬩w2
    Balance: ${walletBallance ? walletBallance[1] : '0.0'} ETH ⬩ $0
    Transactions: 0
    Address: ${wallet[1]}
    
    ▰ Wallet⬩w3
    Balance: ${walletBallance ? walletBallance[2] : '0.0'} ETH ⬩ $0
    Transactions: 0
    Address: ${wallet[2]}`;

  return message;
};

export const WalletBalanceResponse = () => {
  const message = `mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmooooo`;
  return message;
};

export const ReplaceWallet = () => {
  const message = `🔧 Replace Wallet - Which wallet do you want to replace?

  ⚠️ Warning: Replaced wallets cannot be recovered.`
  return message;
}

export const MenuInlineKeyboard = {
  inline_keyboard: [
    [{ text: 'Buy Tokens', callback_data: 'buy_tokens' }],
    [{ text: 'Sell Tokens', callback_data: 'sell_tokens' }],
    [{ text: 'Buy Limit', callback_data: 'buy_limit' }],
    [{ text: 'Sell Limit', callback_data: 'sell_limit' }],
    [{ text: 'Copy Trade', callback_data: 'copy_trade' }],
    [{ text: 'Method Sniper', callback_data: 'method_sniper' }],
    [{ text: 'Token Balances', callback_data: 'token_balance' }],
    [{ text: 'PNL Analysis', callback_data: 'pnl_analysis' }],
    [{ text: 'Settings', callback_data: 'settings' }],
  ],
};

export const SettingsInlineKeyboard = {
  inline_keyboard: [
    [{ text: 'Main Menu', callback_data: 'main_menu' }],
    [{ text: 'Close', callback_data: 'close' }],
    [{ text: 'Replace Wallet', callback_data: 'replace_wallet'}],
    [{ text: 'Import Wallet', callback_data: 'import_wallet' }],
    [{ text: 'Private Key', callback_data: 'private_key' }],
    [{ text: 'Transfer Eth', callback_data: 'transfer_eth' }],
    [{ text: 'Transfer Token', callback_data: 'transfer_eth' }],
    [{ text: 'Set Password', callback_data: 'set_password' }],
    [{ text: 'Link Wallet', callback_data: 'link_wallet' }],
    [{ text: 'Hide Tooltips', callback_data: 'hide_tooltips' }],
  ],
};

export const ReplaceWalletInlineKeyboard = {
  inline_keyboard: [
    [{ text: 'Wallet 1', callback_data: 'wallet_1' }],
    [{ text: 'Wallet 2', callback_data: 'wallet_2' }],
    [{ text: 'Wallet 3', callback_data: 'wallet_3'}],
    [{ text: 'Close', callback_data: 'close_wallet'}],
  ]
}