module.exports = {
  name: 'menu',
  description: 'Show main menu',
  execute(bot, msg) {
    const chatId = msg.chat.id;
    const keyboard = {
      inline_keyboard: [
        [
          { text: '💰 Wallet Tracker', callback_data: 'wallet-tracker' }
        ]
      ]
    };

    const welcomeMessage = `👋 *Welcome to SentoX !*\n\n`
      + `I can help you track your crypto wallet balances and transactions.\n\n`
      + `Select an option below to get started:`;

    bot.sendMessage(chatId, welcomeMessage, {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  },
  handleCallback(bot, query) {
    const messageId = query.message.message_id;
    const chatId = query.message.chat.id;
    
    bot.editMessageText('Select an option:', {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '💰 Wallet Tracker', callback_data: 'wallet-tracker' }
          ]
        ]
      }
    });
  }
}; 