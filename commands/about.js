module.exports = {
  name: 'about',
  description: 'About the bot',
  execute(bot, msg) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'I am a simple Telegram bot that shows you a menu of options.');
  },
  handleCallback(bot, query) {
    const messageId = query.message.message_id;
    const chatId = query.message.chat.id;
    
    bot.editMessageText('I am a simple Telegram bot that shows you a menu of options.', {
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