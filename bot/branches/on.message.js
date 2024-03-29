const User = require('../../models/user')
const { bot } = require('../bot')
const { start } = require('../on-message/main')
const { userAction, menu, userMenuListener } = require('../options/selection')

bot.on('message', async msg => {
  const chatId = msg.chat.id
  const text = msg.text
  const user = await User.findOne({userId: chatId})

  if (text === '/start')
    start(chatId)
  
  if (user) {
    let language = user?.language || 'uz'
    if (user.action !== '')
      userAction[user?.action](chatId, msg, text)

    if (menu[userMenuListener(language, text)])
      return menu[userMenuListener(language, text)](chatId, language, msg)
  }
})