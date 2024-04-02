const { bot } = require('../bot')
const Cart = require('../../models/cart')
const { getTranslate, getFullTranslate } = require('../options/helper')

const deleteCartItem = async (chatId, language, userId, query) => {
  const _id = query.data.split('-')[1]
  console.log(_id);
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

  let { text, inlineKb } = await getCartItems(cart, language)
  bot.editMessageText(text, {
    chat_id: chatId,
    message_id: query.message.message_id,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: inlineKb
    },
  })
}


module.exports = {
  deleteCartItem
}