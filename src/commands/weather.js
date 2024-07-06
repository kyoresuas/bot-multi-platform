const { getWeather } = require('../services/weatherService');

module.exports = {
  // Название команды
  name: 'weather',

  // Алиасы для команды: альтернативные способы вызова команды
  aliases: ['w'],

  // Платформы, на которых команда будет доступна
  platforms: ['telegram', 'vk'], // Команда доступна только в Telegram и VK
  async execute(context, args) {
    if (args.length === 0) {
      return 'Пожалуйста, укажите город.';
    }

    const city = args.join(' ');
    try {
      const weather = await getWeather(city);
      return `Текущая погода в ${weather}`;
    } catch (error) {
      return 'Не удалось получить погоду. Пожалуйста, попробуйте позже.';
    }
  }
};
