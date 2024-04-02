const { Schema, model } = require('mongoose')

const cart = new Schema({
  products: [{
    product: Schema.Types.ObjectId,
    count: Number
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})


module.exports = model('Cart', cart)