const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  itemSold: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  date: { type: Date }
})

const Sales = mongoose.model('Sales', salesSchema);

// Export modules

module.exports = { Sales }