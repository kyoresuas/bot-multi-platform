const { Telegraf } = require('telegraf');
const { handleCommand } = require('../handlers/commandHandler');

const startTelegramBot = async () => {
  const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

  bot.on('text', (ctx) => handleCommand(ctx.message.text, ctx, 'telegram'));

  await bot.launch();
};

module.exports = { startTelegramBot };
