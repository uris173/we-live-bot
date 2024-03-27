const { Schema, model } = require('mongoose')

const user = new Schema({
  userId: Number,
  name: String,
  username: String,
  phone: String,
  action: String,
  language: String
})


module.exports = model('user', user)