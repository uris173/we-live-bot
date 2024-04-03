const { Schema, model } = require('mongoose')

const user = new Schema({
  userId: Number,
  name: String,
  username: String,
  phone: String,
  action: String,
  language: String,
  birthDay: String,
  passNumber: String,
  membership: {
    type: Boolean,
    default: false
  }
})


module.exports = model('user', user)