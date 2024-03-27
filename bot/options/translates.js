const { links } = require("./links")

const uz = {
  // messages
  selectMenu: "Menyuni tanlang...",
  aboutUs: `<b>WeLive</b> kompaniyasining O'zbekistondagi 1-rasmiy vakili.\n<b>100%</b> sifat\n<b>100%</b> halal\n<b>100%</b> tabiy\nTurkiyada ishlab chiqarilgan.\nFranshiza egasi <a href="${links.dilorom}">Dilorom Mannapova</a>`,
  contacts: `Telefon: <a href="tel:${links.phoneLink}">${links.phone}</a>\nTelegram: ${links.telegram}\nInstagram: ${links.instagram}`,
  leaveFeedback: "",

  // keyboards
}

const ru = {
  // messages
  selectMenu: "Выберите меню...",
  aboutUs: `<b>WeLive</b> 1-й официальный представитель компании в Узбекистане.\n<b>100%</b> качество\n<b>100%</b> халяль\n<b>100%</b> натуральный\nПроизведено в Турции.\nВладелец франшизы <a href="${links.dilorom}">Дилором Маннапова</a>`,
  contacts: `Телефон: <a href="tel:${links.phoneLink}">${links.phone}</a>\nТелеграм: ${links.telegram}\nИнстаграм: ${links.instagram}`,
  leaveFeedback: "",

  // keyboards
}



module.exports = { uz, ru }