const { bot } = require('../bot')
const Cart = require('../../models/cart')
const { getTranslate, getFullTranslate, postData } = require('../options/helper')

const deleteCartItem = async (chatId, language, userId, query) => {
  const _id = query.data.split('-')[1]
  const { translate, kb } = getFullTranslate(language)
  bot.answerCallbackQuery(query.id, {text: translate.itemDeleted, show_alert: true})

  await Cart.findOneAndUpdate({ user: userId }, {
    $pull: { 'products': { _id } }
  })

  const cart = await Cart.findOne({user: userId})
  if (!cart?.products?.length) {
    await Cart.findByIdAndDelete(cart._id)
    bot.deleteMessage(chatId, query.message.message_id)
    return bot.sendMessage(chatId, translate.emptyCart, kb)
  }

  try {
    let { text, inlineKb } = await getCartItems(cart, language)
    bot.editMessageText(text, {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: inlineKb
      },
    })
  } catch (error) {
    console.error(error)
    bot.deleteMessage(chatId, query.message.message_id)
    bot.sendMessage(chatId, translate.errorServerResponse, kb)
  }
}

const order = async (chatId, language, userId, query) => {
  const { translate, kb } = getFullTranslate(language)
  const cart = await Cart.findOne({user: userId}).lean()
  const {_id, ...body} = cart
  try {
    const response = await postData(`order/create`, body)
    if (response) {
      await bot.answerCallbackQuery(query.id, {text: translate.successOrder, show_alert: true})
      await bot.deleteMessage(chatId, query.message.message_id)
      await bot.sendMessage(chatId, translate.selectMenu, kb)
      await Cart.findByIdAndDelete(_id)
    }
  } catch (error) {
    console.error(error)
    await bot.deleteMessage(chatId, query.message.message_id)
    bot.sendMessage(chatId, translate.errorServerResponse, kb)
  }
}


module.exports = {
  deleteCartItem,
  order,
}