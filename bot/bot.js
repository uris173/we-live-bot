const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(process.env.TOKEN, {
  polling: true
})

const url = 'http://192.168.24.102:3016'

const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

module.exports = {
  bot,
  url,
  sliceIntoChunks
}


require('./branches/on.message')
require('./branches/callback')