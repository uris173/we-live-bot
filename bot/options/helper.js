const axios = require('axios')
const { uzMenu, ruMenu } = require("./keyboards");
const { uz, ru } = require("./translates");

const getFullTranslate = language => language === 'uz' ? { kb: uzMenu, translate: uz } : { kb: ruMenu, translate: ru }

const getTranslate = language => language === 'uz' ? uz : ru

const getUser = async (userId) => {
  let response = await axios.get(`${process.env.SERVER_URI}/user/${userId}`)
  if (response.status === 200) return response.data
  else return {message: 'userNotFound'}
}


module.exports = {
  getFullTranslate, 
  getTranslate,
  getUser
}