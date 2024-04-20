const axios = require('axios')
const { uzMenu, ruMenu } = require("./keyboards");
const { uz, ru } = require("./translates");
const { url, sliceIntoChunks } = require('../bot');

const getFullTranslate = language => language === 'uz' ? { kb: uzMenu, translate: uz } : { kb: ruMenu, translate: ru }

const getTranslate = language => language === 'uz' ? uz : ru

const postData = async (path, data) => {
  let response = await axios.post(`${url}/${path}`, {
    data
  })
  if (response.data?.msg || response.data) return 'success'
}

const putData = async (path, data) => {
  let response = await axios.put(`${url}/${path}`, {
    data
  })
  if (response.data?.msg || response.data) return 'success'
}

const getData = async (path) => {
  let response = await axios.get(`${url}/${path}`)
  try {
    if (response.status === 200) return response.data
  } catch (error) {
    return error
  }
}

const getProductInfo = (language, product, costText, priceText) => {
  const text = `<i>${product.category.title}</i>\n<b>${product.title}\n</b>${costText} ${product.price.toLocaleString()} ${priceText}\n\n${product.description.replace(/<[^>]*>/g, '')}`
  return {
    img: `${url}/${product.img[0].response}`,
    text,
  }
}

const getCartItems = async (cart, language) => {
  const translate = getTranslate(language)

  let text = ''
  let totalPrice = 0
  let cartProducts = await Promise.all(cart.products.map(async (val, idx) => {
    let { product } = await getData(`product/${val.product}?language=${language}`)
    let price = val.count * product.price
    totalPrice += price
    text += `${idx + 1}) ${product.title} - ${product.price.toLocaleString()} × ${val.count} = <b>${price.toLocaleString()} ${translate.priceText}</b>\n`
    return { text: `${product.title} ❌`, callback_data: `delete-${val._id}` }
  }))
  text += `\n${translate.totalPrice} <b>${totalPrice.toLocaleString()} ${translate.priceText}</b>`
  let inlineKb = sliceIntoChunks(cartProducts, 1)
  inlineKb.push(
    [{text: translate.order, callback_data: 'order'}],
    [{text: translate.back, callback_data: 'back to menu'}],
  )

  return {
    text,
    inlineKb
  }
}


module.exports = {
  getFullTranslate, 
  getTranslate,
  postData,
  putData,
  getData,
  getProductInfo,
  getCartItems
}