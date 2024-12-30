const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  canteenId: { type: Number, required: true },
  stock:{type: Number, required: true},
  imageUrl: { type: String},
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
