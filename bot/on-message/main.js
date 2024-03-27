const { bot } = require('../bot')
const { languageKb } = require('../options/keyboards')
const User = require('../../models/user')
const { getFullTranslate, getUser } = require('../options/helper')

const start = async (chatId) => {
  const findUser = await User.findOne({userId: chatId})
  if (!findUser) {
    await new User({userId: chatId, action: 'enter language'}).save()
    return bot.sendMessage(chatId, `Здравствуйте, выберите язык 🌐.\nAssalomu alaykum, til tanlang. 🌐`, languageKb)
  }
  if (!findUser.language) return bot.sendMessage(chatId, 'Выберите язык 🌐\nTil tanlang. 🌐', languageKb)
  if (!findUser.phone) {
    await User.findByIdAndUpdate(findUser._id, {action: 'enter phone'})
    return bot.sendMessage(chatId, translate.enterPhone, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [ [{text: translate.requestContact, request_contact: true}] ]
      }
    })
  }

  await User.findByIdAndUpdate(findUser._id, {$set: {action: ''}})
  let { kb, translate } = getFullTranslate(findUser.language)
  bot.sendMessage(chatId, translate.selectMenu, kb)
}

const getLanguage = async (chatId, text) => {
  let language = text === "O'zbek tili 🇺🇿" ? 'uz' : 'ru'
  let { kb, translate } = getFullTranslate(language)

  const findUser = await User.findOne({userId: chatId})
  await User.findByIdAndUpdate(findUser._id, {$set: {language}})

  if (!findUser.phone) {
    await User.findByIdAndUpdate(findUser._id, {$set: {action: 'enter phone'}})
    return bot.sendMessage(chatId, translate.enterPhone, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [ [{text: translate.requestContact, request_contact: true}] ]
      }
    })
  }
  else bot.sendMessage(chatId, translate.selectMenu, kb)
}

const getPhone = async (chatId, msg) => {
  const findUser = await User.findOne({userId: chatId})
  const { kb, translate } = getFullTranslate(findUser.language)

  if (!msg.contact) return bot.sendMessage(chatId, translate.incPhone, {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [ [{text: translate.requestContact, request_contact: true}] ]
    }
  })


}

const getAboutUs = async (chatId, language) => {
  let { kb, translate } = getFullTranslate(language)
  bot.sendMessage(chatId, translate.aboutUs, kb)
}


module.exports = {
  start
}