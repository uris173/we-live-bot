const { bot } = require('../bot');
const User = require('../../models/user')
const Feedback = require('../../models/feedback')
const { getFullTranslate, getTranslate } = require('../options/helper');

const backToMenu = async (chatId, language, query) => {
  bot.answerCallbackQuery(query.id).then(() => {
    const { kb, translate } = getFullTranslate(language)
    bot.deleteMessage(chatId, query.message.message_id)
    bot.sendMessage(chatId, translate.selectMenu, kb)
  })
}

const getFeedbackRate = async (chatId, language, query) => {
  bot.answerCallbackQuery(query.id).then(async () => {
    const translate = getTranslate(language)
    
    const rate = query.data.split('-')[1]
    const user = await User.findOne({userId: chatId})
    await new Feedback({user: user._id, rate}).save()
    await User.findByIdAndUpdate(user._id, {$set: {action: 'enter feedback comment'}})

    bot.deleteMessage(chatId, query.message.message_id)
    bot.sendMessage(chatId, translate.enterFeedbackComment, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [ [translate.skip] ]
      }
    })
  })
}


module.exports = {
  backToMenu,
  getFeedbackRate
}