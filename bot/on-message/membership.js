const { bot } = require('../bot')
const User = require('../../models/user')
const { getFullTranslate, putData } = require('../options/helper')

const getName = async (chatId, language, text) => {
  let { translate, kb } = getFullTranslate(language)
  if (text !== translate.back) {
    await User.findOneAndUpdate({ userId: chatId }, {$set: { action: 'enter birth', name: text }})
    return bot.sendMessage(chatId, translate.enterBirth, {
      parse_mode: 'HTML',
      reply_markup: {
        resize_keyboard: true,
        keyboard: [ [translate.back] ]
      }
    })
  }
  bot.sendMessage(chatId, translate.selectMenu, kb)
}

const enterBirth = async (chatId, language, text) => {
  let { translate, kb } = getFullTranslate(language)
  if (text !== translate.back) {
    await User.findOneAndUpdate({ userId: chatId }, {$set: { action: 'enter pass num', birthDay: text }})
    return bot.sendMessage(chatId, translate.enterPassNum, {
      parse_mode: 'HTML',
      reply_markup: {
        resize_keyboard: true,
        keyboard: [ [translate.back] ]
      }
    })
  }
  await User.findOneAndUpdate({ userId: chatId }, {$set: { action: 'enter name' }})
  bot.sendMessage(chatId, translate.enterName, {
    parse_mode: 'HTML',
      reply_markup: {
        resize_keyboard: true,
        keyboard: [ [translate.back] ]
      }
  })
}

const getPassNum = async (chatId, language, text) => {
  let { translate, kb } = getFullTranslate(language)
  if (text !== translate.back) {
    const findUser = await User.findOne({userId: chatId}).lean()
    try {
      let user = await User.findByIdAndUpdate({ _id: findUser._id }, {$set: { action: '', membership: true, passNumber: text }}, {new: true})
      let response = await putData(`user`, user)
      if (response) return bot.sendMessage(chatId, translate.membershipMessage, kb)
    } catch (error) {
      console.error(error)
      await User.findByIdAndUpdate(findUser._id, {$set: { action: '' }})
      return bot.sendMessage(chatId, translate.errorServerResponse, kb)
    }
  }
  await User.findOneAndUpdate({ userId: chatId }, {$set: { action: 'enter birth' }})
  bot.sendMessage(chatId, translate.enterBirth, {
    parse_mode: 'HTML',
      reply_markup: {
        resize_keyboard: true,
        keyboard: [ [translate.back] ]
      }
  })
}


module.exports = {
  getName,
  enterBirth,
  getPassNum
}