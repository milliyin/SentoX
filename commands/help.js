module.exports = {
  name: 'help',
  description: 'Show available commands',
  execute(bot, msg) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Available commands:\n/start - Start the bot\n/menu - Show menu options');
  },
  handleCallback(bot, query) {
    const messageId = query.message.message_id;
    const chatId = query.message.chat.id;
    
    bot.editMessageText('Available commands:\n/start - Start the bot\n/menu - Show menu options', {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [
            { text: '« Back', callback_data: 'back' }
          ]
        ]
      }
    });
  }
}; 