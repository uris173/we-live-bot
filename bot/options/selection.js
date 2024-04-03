const { deleteCartItem, order } = require('../callback/cart')
const {
  getFeedbackRate,
  backToMenu,
  backToCategory
} = require('../callback/main')
const { counter, addToCart, goToCart } = require('../callback/product')

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
  changelang,
  getCart,
  getMembership
} = require('../on-message/main')
const { getName, enterBirth, getPassNum } = require('../on-message/membership')
const { uz, ru } = require('./translates')

const userMenuListener = (lang, text) => {
  let language = lang === 'uz' ? uz : ru
  return Object.keys(language).find(key => language[key] === text)
}

const userAction = {
  'enter language': getLanguage,
  'enter phone': getPhone,
  'enter feedback comment': getFeedbackComment,
  'enter name': getName,
  'enter birth': enterBirth,
  'enter pass num': getPassNum
}

const menu = {
  'catalog': getCategory,
  'aboutUs': getAboutUs,
  'contacts': getContacts,
  'membership': getMembership,
  'feedback': enterFeedback,
  'settings': getSetting,
  'back': getBackToMenu,
  'changelang': changelang,
  'cart': getCart,
}

const callbacks = {
  'back to menu': backToMenu,
  'feedback': getFeedbackRate,
  'back to category': backToCategory,
  'counter': counter,
  'toCart': addToCart,
  'go to cart': goToCart,
  'delete': deleteCartItem,
  'order': order
}


module.exports = {
  userMenuListener,
  userAction,
  menu,
  callbacks
}