const { Schema, model } = require('mongoose')

const cartStorage = new Schema({
  product: Schema.ObjectId,
  count: Number,
  attributes: [{
    attribute: Schema.ObjectId,
    value: String,
    price: Number
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})


module.exports = model('cartstorage', cartStorage)