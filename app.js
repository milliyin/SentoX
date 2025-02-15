const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    bot.sendMessage(chatId, 'Welcome! I am a simple bot. Try sending me any message.');
    return;
  }

  if (text.startsWith('/echo')) {
    const message = text.slice(6);
    bot.sendMessage(chatId, message);
    return;
  }

  bot.sendMessage(chatId, `You said: ${text}`);
});