// routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); // Import the User model

const router = express.Router();

// Create User (POST)
router.post('/create', async (req, res) => {
  console.log('Incoming Data:', req.body); // Log the received data
  const { name, rollno, address, phoneNumber } = req.body;
  try {
    const user = new User({ name, rollno, address, phoneNumber });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});


// Read all Users (GET)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single User by Roll No (GET)
router.get('/users/:rollno', async (req, res) => {
  try {
    const rollno = req.params.rollno;
    console.log('Received rollno:', rollno);  // Log rollno to check what is being passed
    
    const user = await User.findOne({ rollno });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user); // Log user data to ensure it's correct
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: error.message });
  }
});


// Update User by Roll No (PUT)
router.put('/users/:rollno', async (req, res) => {
  const { name, address, phoneNumber } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { rollno: req.params.rollno },
      { name, address, phoneNumber },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete User by Roll No (DELETE)
router.delete('/users/:rollno', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ rollno: req.params.rollno });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
