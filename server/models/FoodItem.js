// models/FoodItem.js
const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  foodItem: { type: String, required: true },
  price: { type: Number, required: true },
  contact: { type: String, required: true },
  image: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);