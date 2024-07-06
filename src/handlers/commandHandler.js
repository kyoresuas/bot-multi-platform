const fs = require('fs');
const path = require('path');
const { sendResponse } = require('./contextHandler');

const commands = new Map();
const commandPrefix = process.env.COMMAND_PREFIX;

fs.readdirSync(path.join(__dirname, '../commands')).forEach(file => {
  if (file.endsWith('.js')) {
    const command = require(`../commands/${file}`);
    commands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach(alias => {
        commands.set(alias, command);
      });
    }
  }
});

const matchCommand = (commandName, platform) => {
  for (const [key, command] of commands.entries()) {
    if (
      (typeof key === 'string' && key === commandName) ||
      (key instanceof RegExp && key.test(commandName))
    ) {
      if (!command.platforms || command.platforms.includes(platform)) {
        return command;
      }
    }
  }
  return null;
};

const handleCommand = async (message, context, platform) => {
  const args = message.trim().split(/\s+/);
  const commandNameWithPrefix = args.shift().toLowerCase();

  if (commandNameWithPrefix.startsWith(commandPrefix)) {
    const commandName = commandNameWithPrefix.slice(commandPrefix.length);
    const command = matchCommand(commandName, platform);

    if (command) {
      try {
        let response;
        if (typeof command.execute === 'function') {
          response = await command.execute(context, args);
        } else {
          response = command.response;
        }

        if (response) {
          sendResponse(context, response);
        } else {
          console.error(`Команда ${commandName} вернула пустой ответ.`);
        }
      } catch (error) {
        console.error(`Ошибка выполнения команды ${commandName}:`, error);
      }
    }
  }
};

module.exports = { handleCommand };
