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

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    commands.get('menu').execute(bot, msg);
    return;
  }

  // Check if any command is waiting for input
  for (const command of commands.values()) {
    if (command.handleMessage && await command.handleMessage(bot, msg)) {
      return;
    }
  }

  // Handle commands
  if (text?.startsWith('/')) {
    const commandName = text.slice(1);
    const command = commands.get(commandName);
    if (command) {
      command.execute(bot, msg);
      return;
    }
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