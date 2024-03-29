const {
  getFeedbackRate,
  backToMenu
} = require('../callback/main')

const {
  getLanguage,
  getPhone,
  getCategory,
  getAboutUs,
  getContacts,
  enterFeedback,
  getFeedbackComment
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
}

const callbacks = {
  'back to menu': backToMenu,
  'feedback': getFeedbackRate
}


module.exports = {
  userMenuListener,
  userAction,
  menu,
  callbacks
}