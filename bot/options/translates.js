const links = {
  phone: "+998(90)323-80-85",
  phoneLink: "998903238085",
  telegram: "https://t.me/welive01",
  instagram: "https://instagram.com/welive.uz",
  dilorom: "https://www.instagram.com/dilorom_mannapova/"
}

const uz = {
  // messages
  enterPhone: `Botdan foydalanish uchun tugmani bosish orqali kontakt ma'lumotlaringizni yuborishingiz kerak "Kontaktni yuborish 📞"`,
  catalogText: "Katalog tanlang...",
  selectMenu: "Menyuni tanlang...",
  aboutUsText: `<b>WeLive</b> kompaniyasining O'zbekistondagi 1-rasmiy vakili.\n<b>100%</b> sifat\n<b>100%</b> halal\n<b>100%</b> tabiy\nTurkiyada ishlab chiqarilgan.\nFranshiza egasi <a href="${links.dilorom}">Dilorom Mannapova</a>`,
  contactsText: `Telefon: <a href="tel:${links.phoneLink}">${links.phone}</a>\nTelegram: ${links.telegram}\nInstagram: ${links.instagram}`,
  leaveFeedbackText: "Xizmatimizga 1 dan 5 🌟 gacha baho bering",
  enterFeedbackComment: "Iltimos, sharhingizni yozing... Xizmatni yaxshilash bo'yicha har qanday taklif va fikr-mulohazalaringizni yozing.",
  costText: "Narx:",
  priceText: "so'm", 
  changelang: "Tilni o'zgartirish 🌐",
  chooseLang: "Til tanlang 🌐",
  selectAction: "Harakatni tanlang...",

  // error messages
  incPhone: `<i>"Kontaktni yuborish 📞"</i> <b>tugmasini bosib telefon raqamingizni yuboring</b>`,
  errorServerResponse: "Serverdan javob yo'q. Bir oz kutib turing.",
  enterFeedback: `Siz bizning xizmatimizni baholashni tugatmagansiz, sharh qoldiring yoki <i>"O'tkazib yuborish ➡️"</i> tugmasini bosib ushbu qismni o'tkazib yuboring.`,

  // keyboards
  requestContact: "Kontaktni yuborish 📞",
  back: "Orqaga 🔙",
  skip: "O'tkazib yuborish ➡️",
  // menu
  catalog: "Katalog 🗂",
  aboutUs: "Biz haqimizda ℹ️",
  contacts: "Kontaktlar 📞",
  feedback: "Sharh qoldiring ✍️",
  cart: "Savat 🧺",
  settings: "Sozlamalar ⚙️"
}

const ru = {
  // messages
  enterPhone: `Чтобы пользоваться ботом необходимо отправить контактные данные, нажав на кнопку "Отправить контакт 📞"`,
  catalogText: "Выберите каталог...",
  selectMenu: "Выберите меню...",
  aboutUsText: `<b>WeLive</b> 1-й официальный представитель компании в Узбекистане.\n<b>100%</b> качество\n<b>100%</b> халяль\n<b>100%</b> натуральный\nПроизведено в Турции.\nВладелец франшизы <a href="${links.dilorom}">Дилором Маннапова</a>`,
  contactsText: `Телефон: <a href="tel:${links.phoneLink}">${links.phone}</a>\nТелеграм: ${links.telegram}\nИнстаграм: ${links.instagram}`,
  leaveFeedbackText: "Оцените пожалуйста наш сервис от 1 до 5 🌟",
  enterFeedbackComment: "Пожалуйста напишите свой отзыв... Какие есть предложения по улучшению сервиса и ваш отзыв.",
  costText: "Цена:",
  priceText: "сум", 
  changelang: "Изменить язык 🌐",
  chooseLang: "Выберите язык 🌐",
  selectAction: "Выберите действие...",

  // error messages
  incPhone: `<b>Отправьте номер телефона нажав на кнопку</b> <i>"Отправить контакт 📞"</i>`,
  errorServerResponse: "Нет ответа от сервера. Пожалуйста подождите некоторое время.",
  enterFeedback: `Вы не закончили оценку нашего сервиса, пожалуйста оставьте коментарий или пропустите эту часть нажав на кнопку <i>"Пропустить ➡️"</i>`,

  // keyboards
  requestContact: "Отправить контакт 📞",
  back: "Назад 🔙",
  skip: "Пропустить ➡️",
  // menu
  catalog: "Каталог 🗂",
  aboutUs: "О нас ℹ️",
  contacts: "Контакты 📞",
  feedback: "Оставить отзыв ✍️",
  cart: "Корзина 🧺",
  settings: "Настройки ⚙️"
}



module.exports = { uz, ru }