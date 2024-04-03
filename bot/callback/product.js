const { bot } = require('../bot')
const User = require('../../models/user')
const CartStorage = require('../../models/cart.storage')
const Cart = require('../../models/cart')
const { getTranslate, getCartItems, getFullTranslate } = require('../options/helper')
// const Cart = require('../../models/')

const counter = async (chatId, language, userId, query) => {
  const translate = getTranslate(language)
  let data = query.data.split(',')
  const count = parseInt(data[0].split('-')[1])
  const _id = data[1].split('-')[1]

  const storage = await CartStorage.findOne({user: userId, product: _id})
  if (count <= 0) return bot.answerCallbackQuery(query.id, {text: translate.minimumCount, show_alert: true})
  if (!storage) await new CartStorage({ user: userId, product: _id, count }).save()
  else await CartStorage.findByIdAndUpdate(storage._id, { count })

  bot.answerCallbackQuery(query.id).then(async () => {
    bot.editMessageReplyMarkup({
      inline_keyboard: [
        [
          {text: '➖', callback_data: `counter-${count - 1},prod-${_id}`},
          {text: count, callback_data: 'nothing'},
          {text: '➕', callback_data: `counter-${count + 1},prod-${_id}`}
        ],
        [
          {text: translate.goToCart, callback_data: `go to cart`},
          {text: translate.addToCart, callback_data: `toCart-${_id}`}
        ],
        [{text: translate.back, callback_data: 'back to category'}]
      ]
    }, {chat_id: chatId, message_id: query.message.message_id})
  })
}

const addToCart = async (chatId, language, userId, query) => {
  const translate = getTranslate(language)
  const _id = query.data.split('-')[1]
  const storage = await CartStorage.findOne({user: userId, product: _id})
  const cart = await Cart.findOne({user: userId})
  let count = storage?.count || 1
  
  if (!cart) {
    await new Cart({user: userId, products: [{ product: _id, count: count }]}).save()
  } else {
    let findCartItem = cart.products.find(val => val.product.toString() === _id)
    if (findCartItem) {
      count += findCartItem.count
      await Cart.findOneAndUpdate(
        {_id: cart._id, 'products.product': _id},
        {$set: {'products.$.count': count}}
      )
    } else {
      await Cart.findByIdAndUpdate(cart._id, {
        $push: { products: { product: _id, count } }
      })
    }
  }

  bot.answerCallbackQuery(query.id, {text: `${translate.addedProduct} ${count}`, show_alert: true})
  await CartStorage.findOneAndDelete({user: userId, product: _id})
  bot.editMessageReplyMarkup({
    inline_keyboard: [
      [
        {text: '➖', callback_data: `counter-${1},prod-${_id}`},
        {text: 1, callback_data: 'nothing'},
        {text: '➕', callback_data: `counter-${2},prod-${_id}`}
      ],
      [
        {text: translate.goToCart, callback_data: `go to cart`}, 
        {text: translate.addToCart, callback_data: `toCart-${_id}`}
      ],
      [{text: translate.back, callback_data: 'back to category'}]
    ]
  }, {chat_id: chatId, message_id: query.message.message_id})
}

const goToCart = async (chatId, language, userId, query) => {
  bot.answerCallbackQuery(query.id)
  const { translate, kb } = getFullTranslate(language)
  const cart = await Cart.findOne({user: userId})
  await CartStorage.findOneAndDelete({user: userId})
  
  try {
    let { text, inlineKb } = await getCartItems(cart, language)
    bot.deleteMessage(chatId, query.message.message_id)
    bot.sendMessage(chatId, text, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: inlineKb
      }
    })
  } catch (error) {
    console.error(error)
    bot.deleteMessage(chatId, query.message.message_id)
    bot.sendMessage(chatId, translate.errorServerResponse, kb)
  }
}


module.exports = {
  counter,
  addToCart,
  goToCart
}