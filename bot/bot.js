const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(process.env.TOKEN, {
  polling: true
})

const url = process.env.SERVER_URI

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
require('./branches/inline-query')