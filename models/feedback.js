const { Schema, model } = require('mongoose')

const feedback = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  rate: Number,
  comment: String,
  status: {
    type: Boolean,
    default: false
  }
})


module.exports = model('feedback', feedback)