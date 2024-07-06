require('dotenv').config();
const BotFactory = require('./botFactory');

const factory = new BotFactory();

factory.registerBot('Telegram бот', require('./bots/telegramBot').startTelegramBot, process.env.ENABLE_TELEGRAM_BOT === 'true');
factory.registerBot('Discord бот', require('./bots/discordBot').startDiscordBot, process.env.ENABLE_DISCORD_BOT === 'true');
factory.registerBot('VK бот', require('./bots/vkBot').startVkBot, process.env.ENABLE_VK_BOT === 'true');

(async () => {
  try {
    await factory.startAll();
  } catch (error) {
    console.error('Ошибка при запуске ботов:', error);
  }
})();
