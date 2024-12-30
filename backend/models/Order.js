// models/Order.js
const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema(
  {
    userAddress: {
      name: { type: String, required: true },
      rollno: { type: String, required: true },
      address: {
        blockName: { type: String, required: true },
        floor: { type: String, required: true },
        roomNumber: { type: String, required: true },
      },
      phoneNumber: { type: String, required: true },
    },
    cartItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        imageUrl: { type: String }, // Optional image URL for the food item
      },
    ],
    total: { type: Number, required: true },
    canteenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Canteen', required: true },
    status: { type: String, default: 'Pending' }, // Status can be 'Pending', 'Completed', etc.
    orderDate: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
