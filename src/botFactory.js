class BotFactory {
  constructor() {
    this.bots = [];
  }

  registerBot(name, startFunction, enabled) {
    if (enabled) {
      this.bots.push({ name, startFunction });
    }
  }

  async startAll() {
    const startPromises = this.bots.map(bot => {
      console.log(`Запуск ${bot.name}...`);
      return bot.startFunction();
    });

    await Promise.all(startPromises);
    console.log('Все активированные боты успешно запущены');
  }
}

module.exports = BotFactory;
