const { Schema, model } = require('mongoose')

const cartStorage = new Schema({
  product: Schema.ObjectId,
  count: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})


module.exports = model('cartstorage', cartStorage)