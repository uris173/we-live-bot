const axios = require('axios')
const { uzMenu, ruMenu } = require("./keyboards");
const { uz, ru } = require("./translates");
const { url } = require('../bot');

const getFullTranslate = language => language === 'uz' ? { kb: uzMenu, translate: uz } : { kb: ruMenu, translate: ru }

const getTranslate = language => language === 'uz' ? uz : ru

const postData = async (path, data) => {
  let response = await axios.post(`${url}/${path}`, {
    data
  })
  if (response.data?.msg || response.data) return 'success'
}

const getData = async (path) => {
  let response = await axios.get(`${url}/${path}`)
  if (response.status === 200) return response.data
  else return 'error'
}

const getProductInfo = (product, costText, priceText) => {
  let values = ``
  product?.attributes.forEach(element => {
    let atrValues = element?.value.map(val => `${val?.value}: <b>${val?.prcie.toLocaleString()}</b> ${priceText}\n`)
    values += `${element?.title.charAt(0).toUpperCase() + element?.title.slice(1)} - ${atrValues}\n`
  })
  const text = `<i>${product.category.title}</i>\n<b>${product.title}\n</b>${costText} ${product.price} ${priceText}\n\n${product.description}\n\n${values}`
  return {
    img: `${url}/${product.img[0]}`,
    text,
  }
}


module.exports = {
  getFullTranslate, 
  getTranslate,
  postData,
  getData,
  getProductInfo
}