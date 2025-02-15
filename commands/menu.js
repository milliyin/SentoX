module.exports = {
  name: 'menu',
  description: 'Show menu options',
  execute(bot, msg) {
    const chatId = msg.chat.id;
    const keyboard = {
      inline_keyboard: [
        [
          { text: '❓ Help', callback_data: 'help' },
          { text: '👋 About', callback_data: 'about' }
        ]
      ]
    };

    bot.sendMessage(chatId, 'Choose an option:', { reply_markup: keyboard });
  },
  handleCallback(bot, query) {
    const messageId = query.message.message_id;
    const chatId = query.message.chat.id;
    
    bot.editMessageText('Choose an option:', {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [
            { text: '❓ Help', callback_data: 'help' },
            { text: '👋 About', callback_data: 'about' }
          ]
        ]
      }
    });
  }
}; 