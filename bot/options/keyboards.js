const { ru, uz } = require("./translates")

const languageKb = {
  reply_markup: {
    parse_mode: 'HTML',
    resize_keyboard: true,
    keyboard: [
      ["🇺🇿 O'zbek tili", '🇷🇺 Русский язык']
    ]
  }
}

const uzMenu = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [uz.catalog, uz.aboutUs],
      [uz.contacts, uz.bonus, uz.cart],
      [uz.feedback, uz.membership],
      [uz.settings]
    ]
  }
}

const ruMenu = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [ru.catalog, ru.aboutUs],
      [ru.contacts, ru.bonus, ru.cart],
      [ru.feedback, ru.membership],
      [ru.settings]
    ]
  }
}


module.exports = {
  languageKb,
  uzMenu,
  ruMenu
}