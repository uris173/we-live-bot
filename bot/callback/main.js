const { bot, sliceIntoChunks } = require('../bot');
const User = require('../../models/user')
const CartStorage = require('../../models/cart.storage')
const Feedback = require('../../models/feedback')
const { getFullTranslate, getTranslate, getData } = require('../options/helper');

const backToMenu = async (chatId, language, query) => {
  await User.findOneAndUpdate({ userId: chatId }, { $set: { action: '' } })
  bot.answerCallbackQuery(query.id).then(() => {
    const { kb, translate } = getFullTranslate(language)
    bot.deleteMessage(chatId, query.message.message_id)
    bot.sendMessage(chatId, translate.selectMenu, kb)
  })
}

const getFeedbackRate = async (chatId, language, userId, query) => {
  bot.answerCallbackQuery(query.id).then(async () => {
    const translate = getTranslate(language)
    
    const rate = query.data.split('-')[1]
    const user = await User.findById({_id: userId})
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

const backToCategory = async (chatId, language, userId, query) => {
  bot.answerCallbackQuery(query.id).then(async () => {
    await CartStorage.deleteMany({user: userId})
    bot.deleteMessage(chatId, query.message.message_id)
    const { kb, translate } = getFullTranslate(language)
    try {
      await User.findOneAndUpdate({ userId: chatId }, { $set: { action: 'category products' } })
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
      console.error(error)
      bot.sendMessage(chatId, translate.errorServerResponse, kb)
    }
  })
}

const backToBonus = async (chatId, language, userId, query) => {
  bot.answerCallbackQuery(query.id).then(async () => {
    await CartStorage.deleteMany({user: userId})
    bot.deleteMessage(chatId, query.message.message_id)
    const { kb, translate } = getFullTranslate(language)
    try {
      await User.findOneAndUpdate({ userId: chatId }, { $set: { action: 'bonus products' } })
      let { categories } = await getData(`bonuscategory/all?language=${language}`)
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
      console.error(error)
      bot.sendMessage(chatId, translate.errorServerResponse, kb)
    }
  })
}


module.exports = {
  backToMenu,
  getFeedbackRate,
  backToCategory,
  backToBonus
}