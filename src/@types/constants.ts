export const WelcomeMessage = `Welcome to dextrade. You are now registered and have been assigned new wallets. Fund the wallets provided to start swapping and snipping`;
export const WalletDetails = (wallet: any[], walletBallance?: any[]) => {
  return `
   
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
};

export const SettingsMessage = () => {
  return `⚙️ User Settings ⚙️`;
};

export const WalletBalanceResponse = () => {
  return `mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmooooo`;
};

export const ReplaceWallet = () => {
  return `🔧 Replace Wallet - Which wallet do you want to replace?

  ⚠️ Warning: Replaced wallets cannot be recovered.`;
};

export const WalletPrivateKey = () => {
  return `⚠️ Alert: Wallet w1 has been replaced.`;
};

export const ViewPrivateKeyWarning = () => {
  return `☁️ Your Wallet Private Keys ☁️
  Access your private keys via DexTrade Cloud by clicking the button below. After accessing your keys, the webapp and its contents self-destruct and you will need to regenerate a new link to view your keys again. Additionally the webapp self-destructs after 5 minutes if not accessed. 
  
  Disclaimer: You are responsible for your funds once private keys are revealed. Please exercise extreme caution with these private keys. For your security and privacy, this message will be automatically deleted in 5 minutes.`;
};

export const ImportWalletWarning = () => {
  return `☁️ Import Wallet ☁️
  Import a wallet through DexTrade Cloud functions by clicking the button below. To ensure that user data is safe and secure, the link below self-destructs after use or after 10 minutes of inactivity.
  
  ⚠️ Warning: Replaced wallets cannot be recovered.`;
};

export const TransferEthMessage = () => {
  return `💸 Transfer Eth
  ⬩Gas: 26 GWEI ⬩Block: 17979978 ⬩ETH: $1682`;
};

export const MenuInlineKeyboard = {
  inline_keyboard: [
    [
      { text: 'Buy Tokens', callback_data: 'buy_tokens' },
      { text: 'Sell Tokens', callback_data: 'sell_tokens' },
    ],
    [
      { text: 'Buy Limit', callback_data: 'buy_limit' },
      { text: 'Sell Limit', callback_data: 'sell_limit' },
    ],
    [
      { text: 'Copy Trade', callback_data: 'copy_trade' },
      { text: 'Method Sniper', callback_data: 'method_sniper' },
    ],
    [
      { text: 'Token Balances', callback_data: 'token_balance' },
      { text: 'PNL Analysis', callback_data: 'pnl_analysis' },
    ],
    [{ text: 'Settings', callback_data: 'settings' }],
  ],
};

export const SettingsInlineKeyboard = {
  inline_keyboard: [
    [
      { text: 'Main Menu', callback_data: 'main_menu' },
      { text: 'Close', callback_data: 'close' },
    ],
    [
      { text: 'Replace Wallet', callback_data: 'replace_wallet' },
      { text: 'Import Wallet', callback_data: 'import_wallet' },
    ],
    [
      { text: 'Transfer Eth', callback_data: 'transfer_eth' },
      { text: 'Private Key', callback_data: 'private_key' },
    ],
    [
      { text: 'Transfer Token', callback_data: 'transfer_eth' },
      { text: 'Set Password', callback_data: 'set_password' },
    ],
    [
      { text: 'Link Wallet', callback_data: 'link_wallet' },
      { text: 'Hide Tooltips', callback_data: 'hide_tooltips' },
    ],
  ],
};

export const ReplaceWalletInlineKeyboard = {
  inline_keyboard: [
    [
      { text: 'Wallet 1', callback_data: 'wallet_1' },
      { text: 'Wallet 2', callback_data: 'wallet_2' },
      { text: 'Wallet 3', callback_data: 'wallet_3' },
    ],
    [{ text: 'Close', callback_data: 'close_wallet' }],
  ],
};

export const WalletPrivateKeyInlineKeyboard = {
  inline_keyboard: [
    [{ text: 'Private Keys', callback_data: 'private_keys' }],
    [{ text: 'Close', callback_data: 'close_private_keys' }],
  ],
};

export const PrivateKeyInlineKeyboard = {
  inline_keyboard: [
    [
      { text: 'View Private Keys', callback_data: 'view_private_keys' },
      { text: 'Regenerate Link', callback_data: 'regenerate_link' },
    ],
    [{ text: 'Close', callback_data: 'closeview_private_keys' }],
  ],
};

export const ImportWalletInlineKeyboard = {
  inline_keyboard: [
    [
      { text: 'Import Wallet', callback_data: 'import_wallet_import_wallet' },
      {
        text: 'Regenerate Link',
        callback_data: 'regenerate_link_import_wallet',
      },
    ],
    [{ text: 'Close', callback_data: 'close_import_wallet' }],
  ],
};

export const TransferEthInlineKeyboard = {
  inline_keyboard: [
    [
      { text: 'Menu', callback_data: 'tf_main_menu' },
      { text: 'Close', callback_data: 'tf_close' },
    ],
    [{ text: '🦄 FROM WALLET 🦄', callback_data: 'fffffff' }],
    [
      { text: 'Wallet 1', callback_data: 'tf_wallet_1' },
      { text: 'Wallet 2', callback_data: 'tf_wallet_2' },
      { text: 'Wallet 3', callback_data: 'tf_wallet_3' },
    ],
    [{ text: '🦄 TO WALLET 🦄', callback_data: 'tttttttt' }],
    [
      { text: 'Wallet 1', callback_data: 'tt_wallet_1' },
      { text: 'Wallet 2', callback_data: 'tt_wallet_2' },
      { text: 'Wallet 3', callback_data: 'tt_wallet_3' },
    ],
    [{ text: 'Costum', callback_data: 'costum' }],
    [{ text: '🦄 TRANSFER AMOUNT 🦄', callback_data: 'ttttaaaaa' }],
    [
      { text: '0.1 ETH', callback_data: 'eth_amount_1' },
      { text: '0.3 ETH', callback_data: 'eth_amount_2' },
      { text: '0.5 ETH', callback_data: 'eth_amount_3' },
    ],
    [
      { text: 'Custom', callback_data: 'costum_eth' },
      { text: 'All:0.0 ETH', callback_data: 'all_eth' },
    ],
    [{ text: 'Send Transfer', callback_data: 'send_transfer' }],
  ],
};
