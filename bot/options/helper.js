const axios = require('axios')
const { uzMenu, ruMenu } = require("./keyboards");
const { uz, ru } = require("./translates");

const getFullTranslate = language => language === 'uz' ? { kb: uzMenu, translate: uz } : { kb: ruMenu, translate: ru }

const getTranslate = language => language === 'uz' ? uz : ru

const post = async (path, data) => {
  let response = await axios.post(`${process.env.SERVER_URI}/${path}`, {
    data
  })
  if (response.status === 201) return 'success'
  else return 'error'
}

const getUser = async (userId) => {
  let response = await axios.get(`${process.env.SERVER_URI}/user/${userId}`)
  if (response.status === 200) return response.data
  else return 'userNotFound'
}


module.exports = {
  getFullTranslate, 
  getTranslate,
  post,
  getUser
}