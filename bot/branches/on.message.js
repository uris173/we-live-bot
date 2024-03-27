const { bot } = require('../bot')
const { start } = require('../on-message/main')

bot.on('message', async msg => {
  const chatId = msg.chat.id
  const text = msg.text

  if (text === '/start')
    start(chatId)
})