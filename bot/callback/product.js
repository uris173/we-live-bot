const { bot } = require('../bot')
const User = require('../../models/user')
const CartStorage = require('../../models/cart.storage')
const { getTranslate } = require('../options/helper')
// const Cart = require('../../models/')

const counter = async (chatId, language, query) => {
  const translate = getTranslate(language)
  let data = query.data.split(',')
  const count = parseInt(data[0].split('-')[1])
  const _id = data[1].split('-')[1]

  const user = await User.findOne({userId: chatId})
  const storage = await CartStorage.findOne({user: user._id, product: _id})
  if (count === 1 || storage.count === 1) return bot.answerCallbackQuery(query.id, {text: translate.minimumCount, show_alert: true})
  if (!storage) await new CartStorage({ user: user._id, product: _id, count }).save()
  else await CartStorage.findByIdAndUpdate(storage._id, { count })

  bot.answerCallbackQuery(query.id).then(async () => {
    bot.editMessageReplyMarkup({
      inline_keyboard: [
        [
          {text: '➖', callback_data: `counter-${count - 1},prod-${_id}`},
          {text: count, callback_data: 'nothing'},
          {text: '➕', callback_data: `counter-${count + 1},prod-${_id}`}
        ],
        [{text: translate.selectAttr, callback_data: 'select attr'}],
        [{text: translate.addToCart, callback_data: `toCart-${_id}`}],
        [{text: translate.back, callback_data: 'back to category'}]
      ]
    })
  })
}


module.exports = {
  counter,

}