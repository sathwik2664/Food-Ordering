// models/User.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  blockName: { type: String, required: true },
  floor: { type: String, required: true },
  roomNumber: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollno: { type: String, required: true, unique: true },
  address: { type: addressSchema, required: true },
  phoneNumber: { type: String, required: true },
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
