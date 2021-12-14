const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productName: { type: String, required: true },
  img: { type: String },
  price: { type: Number },
  quantity: { type: Number },

  // categoryID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Category',
  // },
  // image: { type: String },
});

module.exports = mongoose.model('Product', productSchema);
