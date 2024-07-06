const { Client, GatewayIntentBits } = require('discord.js');
const { handleCommand } = require('../handlers/commandHandler');

const startDiscordBot = async () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.on('messageCreate', (message) => {
    if (!message.author.bot) handleCommand(message.content, message, 'discord');
  });

  await client.login(process.env.DISCORD_TOKEN);
};

module.exports = { startDiscordBot };
