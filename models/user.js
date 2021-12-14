const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, required: true },
  phone: { type: Number, required: true },
  mail: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
