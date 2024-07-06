const sendResponse = (context, message) => {
  if (context.reply) {
    context.reply(message);
  } else if (context.send) {
    context.send(message);
  } else if (context.channel && context.channel.send) {
    context.channel.send(message);
  } else {
    console.error('Не удалось определить метод ответа для контекста:', context);
  }
};

module.exports = { sendResponse };
