const links = {
  phone: "+998 90 323 80 85",
  phoneLink: "998903238085",
  telegram: "https://t.me/welive01",
  instagram: "https://instagram.com/welive.uz",
  dilorom: "https://www.instagram.com/dilorom_mannapova/"
}

const uz = {
  // messages
  enterPhone: `Botdan foydalanish uchun tugmani bosish orqali kontakt ma'lumotlaringizni yuborishingiz kerak "Kontaktni yuborish 📞"`,
  selectMenu: "Menyuni tanlang...",
  aboutUs: `<b>WeLive</b> kompaniyasining O'zbekistondagi 1-rasmiy vakili.\n<b>100%</b> sifat\n<b>100%</b> halal\n<b>100%</b> tabiy\nTurkiyada ishlab chiqarilgan.\nFranshiza egasi <a href="${links.dilorom}">Dilorom Mannapova</a>`,
  contacts: `Telefon: <a href="tel:${links.phoneLink}">${links.phone}</a>\nTelegram: ${links.telegram}\nInstagram: ${links.instagram}`,
  leaveFeedback: "",

  // error messages
  incPhone: `<i>"Kontaktni yuborish 📞"</i> <b>tugmasini bosib telefon raqamingizni yuboring</b>`,

  // keyboards
  requestContact: "Kontaktni yuborish 📞"
}

const ru = {
  // messages
  enterPhone: `Чтобы пользоваться ботом необходимо отправить контактные данные, нажав на кнопку "Отправить контакт 📞"`,
  selectMenu: "Выберите меню...",
  aboutUs: `<b>WeLive</b> 1-й официальный представитель компании в Узбекистане.\n<b>100%</b> качество\n<b>100%</b> халяль\n<b>100%</b> натуральный\nПроизведено в Турции.\nВладелец франшизы <a href="${links.dilorom}">Дилором Маннапова</a>`,
  contacts: `Телефон: <a href="tel:${links.phoneLink}">${links.phone}</a>\nТелеграм: ${links.telegram}\nИнстаграм: ${links.instagram}`,
  leaveFeedback: "",

  // error messages
  incPhone: `<b>Отправьте номер телефона нажав на кнопку</b> <i>"Отправить контакт 📞"</i>`,

  // keyboards
  requestContact: "Отправить контакт 📞"
}



module.exports = { uz, ru }