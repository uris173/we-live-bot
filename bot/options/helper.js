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
  if (response.status === 201) return 'success'
}

const getData = async (path) => {
  let response = await axios.get(`${url}/${path}`)
  if (response.status === 200) return response.data
  else return 'error'
}


module.exports = {
  getFullTranslate, 
  getTranslate,
  postData,
  getData
}