const router = require('express').Router()
const { bot } = require('../bot/bot')

router.post('/send-message', async (req, res) => {
  const { userId, message } = req.body
  bot.sendMessage(userId, message, {
    parse_mode: 'HTML'
  })
  res.status(200).json({message: 'Message sended!'})
})


module.exports = router