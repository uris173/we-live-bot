const { bot, sliceIntoChunks } = require('../bot');
const User = require('../../models/user')
const Feedback = require('../../models/feedback')
const { getFullTranslate, getTranslate, getData } = require('../options/helper');

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

const backToCategory = async (chatId, language, query) => {
  bot.answerCallbackQuery(query.id).then(async () => {
    bot.deleteMessage(chatId, query.message.message_id)
    const { kb, translate } = getFullTranslate(language)
    try {
      let { categories } = await getData(`category/all?language=${language}`)
      categories = categories.filter(val => val.title)
      categories = categories.map(({title}) => ({
        text: title || 'titleNotFound',
        switch_inline_query_current_chat: title || 'titleNotFound'
      }))

      let slicedVal = sliceIntoChunks(categories, 2)
      slicedVal.push([{text: translate.back, callback_data: 'back to menu'}])
    
      bot.sendMessage(chatId, translate.catalogText, {
        reply_markup: {
          inline_keyboard: slicedVal
        }
      })
    } catch (error) {
      bot.sendMessage(chatId, translate.errorServerResponse, {
        reply_markup: kb
      })
    }
  })
}


module.exports = {
  backToMenu,
  getFeedbackRate,
  backToCategory
}