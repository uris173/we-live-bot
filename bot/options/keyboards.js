const { ru, uz } = require("./translates")

const languageKb = {
  reply_markup: {
    parse_mode: 'HTML',
    resize_keyboard: true,
    keyboard: [
      ["O'zbek tili 🇺🇿", 'Русский язык 🇷🇺']
    ]
  }
}

const uzMenu = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [uz.catalog, uz.aboutUs],
      [uz.contacts, uz.membership],
      [uz.feedback, uz.cart],
      [uz.settings]
    ]
  }
}

const ruMenu = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [ru.catalog, ru.aboutUs],
      [ru.contacts, ru.membership],
      [ru.feedback, ru.cart],
      [ru.settings]
    ]
  }
}


module.exports = {
  languageKb,
  uzMenu,
  ruMenu
}