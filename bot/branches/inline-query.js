const { bot, url } = require('../bot')
const User = require('../../models/user')
const { getData } = require('../options/helper')

bot.on('inline_query', async query => {
  const chatId = query.from.id
  const queryData = query.query
  const user = await User.findOne({ userId: chatId })

  if (user.action === 'category products') {
    if (queryData !== '') {
      let page = parseInt(query.offset) || 1
      try {
        let { products } = await getData(`product/all_bot?title=${queryData}&limit=10&page=${page}`)
        
        const result = products.map(val => {
          return {
            type: 'article',
            id: val._id,
            title: val.title,
            input_message_content: {
              message_text: `productId-${val._id}`
            },
            description: val.description.replace(/<[^>]*>/g, ''),
            thumbnail_url: `${url}/${val.img[0].response}`
          }
        })
    
        let offset = page + 1
        return bot.answerInlineQuery(query.id, result, {
          next_offset: offset.toString(),
          cache_time: 0
        })
      } catch (error) {
        console.error(error)
      }
    }
  } else if (user.action === 'bonus products') {
    if (queryData !== '') {
      let page = parseInt(query.offset) || 1
      try {
        let { bonus_products } = await getData(`bonusproduct/all_bot?title=${queryData}&limit=10&page=${page}`)
        
        const result = bonus_products.map(val => {
          return {
            type: 'article',
            id: val._id,
            title: val.title,
            input_message_content: {
              message_text: `bonus-${val._id}`
            },
            description: val.description.replace(/<[^>]*>/g, ''),
            thumbnail_url: `${url}/${val.img[0].response}`
          }
        })
    
        let offset = page + 1
        return bot.answerInlineQuery(query.id, result, {
          next_offset: offset.toString(),
          cache_time: 0
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
})