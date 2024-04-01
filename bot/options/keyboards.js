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
      ["Katalog 🗂", "Biz haqimizda ℹ️", "Kontaktlar 📞"],
      ["Sharh qoldiring ✍️"], // "Savat 🧺"
      ["Sozlamalar ⚙️"]
    ]
  }
}

const ruMenu = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      ["Каталог 🗂", "О нас ℹ️", "Контакты 📞"],
      ["Оставить отзыв ✍️"], // "Корзина 🧺"
      ["Настройки ⚙️"]
    ]
  }
}


module.exports = {
  languageKb,
  uzMenu,
  ruMenu
}