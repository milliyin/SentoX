const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

// Command collection
const commands = new Map();

// Load commands
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'))
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    bot.sendMessage(chatId, 'Welcome! I am a simple bot. Use /menu to see available commands.');
    return;
  }

  // Remove the leading slash and get the command name
  const commandName = text?.slice(1);
  const command = commands.get(commandName);

  if (command) {
    command.execute(bot, msg);
    return;
  }

  bot.sendMessage(chatId, 'Use /menu to see available options.');
});

bot.on('callback_query', (query) => {
  const data = query.data;

  if (data === 'back') {
    commands.get('menu').handleCallback(bot, query);
  } else {
    const command = commands.get(data);
    if (command) {
      command.handleCallback(bot, query);
    }
  }

  bot.answerCallbackQuery(query.id);
});