const {
  getFeedbackRate,
  backToMenu,
  backToCategory
} = require('../callback/main')
const { counter } = require('../callback/product')

const {
  getLanguage,
  getPhone,
  getCategory,
  getAboutUs,
  getContacts,
  enterFeedback,
  getFeedbackComment,
  getSetting,
  getBackToMenu,
  changelang
} = require('../on-message/main')
const { uz, ru } = require('./translates')

const userMenuListener = (lang, text) => {
  let language = lang === 'uz' ? uz : ru
  return Object.keys(language).find(key => language[key] === text)
}

const userAction = {
  'enter language': getLanguage,
  'enter phone': getPhone,
  'enter feedback comment': getFeedbackComment
}

const menu = {
  'catalog': getCategory,
  'aboutUs': getAboutUs,
  'contacts': getContacts,
  'feedback': enterFeedback,
  'settings': getSetting,
  'back': getBackToMenu,
  'changelang': changelang
}

const callbacks = {
  'back to menu': backToMenu,
  'feedback': getFeedbackRate,
  'back to category': backToCategory,
  'counter': counter
}


module.exports = {
  userMenuListener,
  userAction,
  menu,
  callbacks
}