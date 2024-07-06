const { VK } = require('vk-io');
const { handleCommand } = require('../handlers/commandHandler');

const startVkBot = async () => {
  const vk = new VK({ token: process.env.VK_TOKEN });

  vk.updates.on('message_new', (context) => {
    context.reply = context.send; 
    handleCommand(context.text, context, 'vk');
  });

  await vk.updates.startPolling();
};

module.exports = { startVkBot };
