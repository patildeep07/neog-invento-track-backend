const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true, unqiue: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  edit: {type:Boolean, default: false}
}, {
  timestamps: true
})

const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = {Inventory}