const { bot, sliceIntoChunks } = require('../bot')
const { languageKb } = require('../options/keyboards')
const User = require('../../models/user')
const CartStorage = require('../../models/cart.storage')
const Cart = require('../../models/cart')
const Feedback = require('../../models/feedback')
const { getFullTranslate, postData, getTranslate, getData, getProductInfo, getCartItems, putData } = require('../options/helper')

const start = async (chatId) => {
  const findUser = await User.findOne({userId: chatId})
  const feedback = await Feedback.findOne({user: findUser?._id})
  if (!findUser) {
    await new User({userId: chatId, action: 'enter language'}).save()
    return bot.sendMessage(chatId, `Здравствуйте, выберите язык 🌐.\nAssalomu alaykum, til tanlang. 🌐`, languageKb)
  }
  if (!findUser.language) return bot.sendMessage(chatId, 'Выберите язык 🌐\nTil tanlang 🌐', languageKb)

  let { kb, translate } = getFullTranslate(findUser.language)
  if (!findUser.phone) return await User.findByIdAndUpdate(findUser._id, {action: 'enter phone'})

  if (feedback) return bot.sendMessage(chatId, translate.enterFeedback, {
    parse_mode: 'HTML',
    reply_markup: {
      resize_keyboard: true,
      keyboard: [ [translate.skip] ]
    }
  })
  
  await User.findByIdAndUpdate(findUser._id, {$set: {action: ''}})
  await CartStorage.deleteMany({user: findUser._id})
  bot.sendMessage(chatId, translate.selectMenu, kb)
}

const getLanguage = async (chatId, msg, text) => {
  if (text !== '/start') {
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
    } else {
      let user = await User.findByIdAndUpdate(findUser._id, {$set: {action: ''}})
      try {
        let response = await putData('user', user)
        if (response) {
          bot.sendMessage(chatId, translate.selectMenu, kb)
        }
      } catch (error) {
        console.error(error)
        bot.sendMessage(chatId, translate.errorServerResponse, kb)
      }
    }
  }
}

const getPhone = async (chatId, msg) => {
  const findUser = await User.findOne({userId: chatId})
  const { kb, translate } = getFullTranslate(findUser.language)

  if (!msg.contact) return bot.sendMessage(chatId, translate.incPhone, {
    parse_mode: 'HTML',
    reply_markup: {
      resize_keyboard: true,
      keyboard: [ [{text: translate.requestContact, request_contact: true}] ]
    }
  })

  let name = msg.chat.first_name
  let phone = msg.contact.phone_number
  .replace(/\D/g, '')
  .replace(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5')

  let user = await User.findByIdAndUpdate(findUser._id, {action: '', phone, name}, {new: true})
  try {
    let response = await postData('user', user)
    if (response === 'success')
      return bot.sendMessage(chatId, translate.selectMenu, kb)
  } catch (error) {
    console.error(error)
    bot.sendMessage(chatId, translate.errorServerResponse, kb)
  }
}

const getCategory = async (chatId, language) => {
  const { kb, translate } = getFullTranslate(language)
  bot.sendMessage(chatId, translate.catalog, {
    reply_markup: {
      remove_keyboard: true
    }
  })
  .then(data => bot.deleteMessage(chatId, data.message_id))

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
    console.error(error)
    bot.sendMessage(chatId, translate.errorServerResponse, kb)
  }
}

const getProduct = async (chatId, language, msg) => {
  const productId = msg.text.split('-')[1]
  const { kb, translate } = getFullTranslate(language)
  bot.deleteMessage(chatId, msg.message_id - 1)
  bot.deleteMessage(chatId, msg.message_id)
  try {
    const { product } = await getData(`product/${productId}?language=${language}`)
    let { img, text } = getProductInfo(language, product, translate.costText, translate.priceText)
    const count = 1
    bot.sendPhoto(chatId, img, {
      parse_mode: 'HTML',
      caption: text,
      reply_markup: {
        inline_keyboard: [
          [
            {text: '➖', callback_data: `counter-${count},prod-${product._id}`},
            {text: count, callback_data: 'nothing'},
            {text: '➕', callback_data: `counter-${count + 1},prod-${product._id}`}
          ],
          [
            {text: translate.goToCart, callback_data: `go to cart`},
            {text: translate.addToCart, callback_data: `toCart-${product._id}`}
          ],
          [{text: translate.back, callback_data: 'back to category'}]
        ]
      }
    })
  } catch (error) {
    console.error(error)
    bot.sendMessage(chatId, translate.errorServerResponse, kb)
  }
}

const getAboutUs = async (chatId, language) => {
  let translate = getTranslate(language)
  bot.sendMessage(chatId, translate.aboutUsText, {
    parse_mode: 'HTML'
  })
}

const getContacts = async (chatId, language) => {
  let translate = getTranslate(language)
  bot.sendMessage(chatId, translate.contactsText, {
    parse_mode: 'HTML'
  })
}

const getMembership = async (chatId, language) => {
  const translate = getTranslate(language)
  const user = await User.findOne({userId: chatId})
  if (user?.membership) return bot.sendMessage(chatId, translate.existsMembership)

  await User.findByIdAndUpdate(user?._id, {$set: {action: 'enter name'}})
  bot.sendMessage(chatId, translate.enterName, {
    parse_mode: 'HTML',
    reply_markup: {
      resize_keyboard: true,
      keyboard: [ [translate.back] ]
    }
  })
}

const enterFeedback = async (chatId, language) => {
  const translate = getTranslate(language)
  bot.sendMessage(chatId, translate.feedback, {
    reply_markup: {
      remove_keyboard: true
    }
  }).then(data => bot.deleteMessage(chatId, data.message_id))

  bot.sendMessage(chatId, translate.leaveFeedbackText, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '1 🌟', callback_data: 'feedback-1' },
          { text: '2 🌟', callback_data: 'feedback-2' },
          { text: '3 🌟', callback_data: 'feedback-3' },
          { text: '4 🌟', callback_data: 'feedback-4' },
          { text: '5 🌟', callback_data: 'feedback-5' },
        ]
      ]
    }
  })
}

const getFeedbackComment = async (chatId, msg) => {
  const text = msg.text
  if (text !== '/start') {
    const user = await User.findOneAndUpdate({userId: chatId}, {$set: {action: ''}}, {new: true})
    const { kb, translate } = getFullTranslate(user.language)
    
    if (text === translate.skip)
      await Feedback.findOneAndUpdate({user: user._id}, {status: true}, {new: true})
    else
      await Feedback.findOneAndUpdate({user: user._id}, {comment: text, status: true}, {new: true})

    let feedback = await Feedback.findOne({user: user._id})
    try {
      let response = await postData('feedback', feedback)
      if (response === 'success') {
        await Feedback.findByIdAndDelete(feedback._id)
        await bot.sendMessage(chatId, translate.selectMenu, kb)
      }
    } catch (error) {
      console.error(error)
      bot.sendMessage(chatId, translate.errorServerResponse, kb)
    }
  }
}

const getCart = async (chatId, language) => {
  const translate = getTranslate(language)
  const user = await User.findOne({userId: chatId})
  const cart = await Cart.findOne({user: user._id})
  if (!cart) return bot.sendMessage(chatId, translate.emptyCart)

  bot.sendMessage(chatId, 'cart', {
    reply_markup: {
      remove_keyboard: true
    }
  }).then(data => bot.deleteMessage(chatId, data.message_id))

  let { text, inlineKb } = await getCartItems(cart, language)
  bot.sendMessage(chatId, text, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: inlineKb
    }
  })
}

const getSetting = async (chatId, language) => {
  const translate = getTranslate(language)
  bot.sendMessage(chatId, translate.selectAction, {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [
        [translate.changelang],
        [translate.back]
      ]
    }
  })
}

const getBackToMenu = (chatId, language) => {
  let { kb, translate } = getFullTranslate(language)
  bot.sendMessage(chatId, translate.selectMenu, kb)
}

const changelang = async (chatId, language) => {
  await User.findOneAndUpdate({userId: chatId}, {$set: {action: 'enter language'}})
  let translate = getTranslate(language)
  bot.sendMessage(chatId, translate.chooseLang, languageKb)
}


module.exports = {
  start,
  getLanguage,
  getPhone,
  getCategory,
  getProduct,
  getAboutUs,
  getContacts,
  getMembership,
  enterFeedback,
  getFeedbackComment,
  getSetting,
  getBackToMenu,
  changelang,
  getCart
}