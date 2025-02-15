module.exports = {
  name: 'wallet-tracker',
  description: 'Track wallet balances and transactions',
  // Store user states
  userStates: new Map(),

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

    // Reset user state when entering main wallet menu
    this.userStates.delete(chatId);

    bot.sendMessage(chatId, '🏦 *Wallet Tracker*\nManage and monitor your crypto wallets.\n\nSelect an option:', {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  },

  async handleMessage(bot, msg) {
    const chatId = msg.chat.id;
    const text = msg.text || '';

    console.log('Current state for chat:', chatId, 'is:', this.userStates.get(chatId));
    console.log('Received message:', text);

    if (this.userStates.get(chatId) === 'WAITING_FOR_WALLET') {
      await bot.sendMessage(chatId, 'Please use the menu options', {
        reply_markup: {
          inline_keyboard: [
            [{ text: '« Back to Menu', callback_data: 'wallet-tracker' }]
          ]
        }
      });
      return true;
    }
    return false;
  },

  handleCallback(bot, query) {
    const messageId = query.message.message_id;
    const chatId = query.message.chat.id;
    
    switch (query.data) {
      case 'wallet_add':
        bot.editMessageText('💰 *Add Wallet*\n\nThis feature is coming soon...', {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '« Back to Menu', callback_data: 'wallet-tracker' }]
            ]
          }
        });
        break;

      case 'wallet_balance':
        bot.editMessageText('*Your Wallet Balances*\n\nNo wallets added yet.', {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '« Back to Menu', callback_data: 'wallet-tracker' }]
            ]
          }
        });
        break;

      case 'wallet_transactions':
        bot.editMessageText('*Recent Transactions*\n\nNo transactions found.', {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '« Back to Menu', callback_data: 'wallet-tracker' }]
            ]
          }
        });
        break;

      case 'wallet_settings':
        bot.editMessageText('*Wallet Settings*\n\nNo settings available yet.', {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '« Back to Menu', callback_data: 'wallet-tracker' }]
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