const { bot } = require('../bot')
const User = require('../../models/user')
const { callbacks } = require('../options/selection')

bot.on('callback_query', async query => {
  const chatId = query.from.id
  const queryData = query.data
  const user = await User.findOne({userId: chatId})
  const language = user.language

  if (queryData === 'back to menu')
    callbacks['back to menu'](chatId, language, query)
  if (queryData.slice(0, 8) === 'feedback')
    callbacks['feedback'](chatId, language, query)
})