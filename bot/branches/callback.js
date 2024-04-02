const { bot } = require('../bot')
const User = require('../../models/user')
const { callbacks } = require('../options/selection')

bot.on('callback_query', async query => {
  const chatId = query.from.id
  const queryData = query.data
  const user = await User.findOne({userId: chatId})
  const language = user.language

  if (queryData === 'back to menu')
    return callbacks['back to menu'](chatId, language, query)
  if (queryData.slice(0, 8) === 'feedback')
    return callbacks['feedback'](chatId, language, user._id, query)
  if (query.data === 'back to category')
    return callbacks['back to category'](chatId, language, user._id, query)
  if (query.data.slice(0, 7) === 'counter')
    return callbacks['counter'](chatId, language, user._id, query)
  if (query.data.slice(0, 6) === 'toCart')
    return callbacks['toCart'](chatId, language, user._id, query)
  if (query.data === 'go to cart')
    return callbacks['go to cart'](chatId, language, user._id, query)
  if (query.data.slice(0, 6) === 'delete')
    return callbacks['delete'](chatId, language, user._id, query)
})