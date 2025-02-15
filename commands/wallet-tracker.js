module.exports = {
  name: 'wallet-tracker',
  description: 'Track wallet balances and transactions',
  execute(bot, msg) {
    const chatId = msg.chat.id;
    const keyboard = {
      inline_keyboard: [
        [
          { text: '💰 Add Wallet', callback_data: 'wallet_add' },
          { text: '📊 View Balance', callback_data: 'wallet_balance' }
        ],
        [
          { text: '📝 Transactions', callback_data: 'wallet_transactions' },
          { text: '⚙️ Settings', callback_data: 'wallet_settings' }
        ],
        [
          { text: '« Back to Menu', callback_data: 'back' }
        ]
      ]
    };

    bot.sendMessage(chatId, '🏦 *Wallet Tracker*\nManage and monitor your crypto wallets.\n\nSelect an option:', {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  },
  handleCallback(bot, query) {
    const messageId = query.message.message_id;
    const chatId = query.message.chat.id;
    
    switch (query.data) {
      case 'wallet_add':
        bot.editMessageText('To add a new wallet, please enter the wallet address.\n\nSupported chains:\n- Ethereum\n- BSC\n- Polygon', {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: {
            inline_keyboard: [
              [{ text: '« Back to Wallet Menu', callback_data: 'wallet-tracker' }]
            ]
          }
        });
        break;

      case 'wallet_balance':
        bot.editMessageText('*Your Wallet Balances*\n\nNo wallets added yet. Use "Add Wallet" to start tracking.', {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '« Back to Wallet Menu', callback_data: 'wallet-tracker' }]
            ]
          }
        });
        break;

      case 'wallet_transactions':
        bot.editMessageText('*Recent Transactions*\n\nNo transactions found. Add a wallet to start tracking.', {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '« Back to Wallet Menu', callback_data: 'wallet-tracker' }]
            ]
          }
        });
        break;

      case 'wallet_settings':
        bot.editMessageText('*Wallet Settings*\n\n• Notification preferences\n• Price alerts\n• Transaction monitoring', {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '« Back to Wallet Menu', callback_data: 'wallet-tracker' }]
            ]
          }
        });
        break;

      default:
        this.execute(bot, query.message);
        break;
    }
  }
}; 