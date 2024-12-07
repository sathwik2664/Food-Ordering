const express = require('express');
const multer = require('multer');
const FoodItem = require('../models/FoodItem'); // Import the FoodItem model

const router = express.Router();

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for storing images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
  },
});

const upload = multer({ storage });

// Route to add a new food item
router.post('/add-food', upload.single('image'), async (req, res) => {
  const { name, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price fields are required!' });
  }

  try {
    const newFood = new FoodItem({ name, price, imageUrl });
    await newFood.save();
    res.status(201).json({ data: newFood, message: 'Food item added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add food item' });
  }
});

// Route to fetch all food items
router.get('/items', async (req, res) => {
  try {
    const items = await FoodItem.find();
    res.status(200).json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
});

// Route to delete a food item
router.delete('/delete-food/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFood = await FoodItem.findByIdAndDelete(id);
    if (!deletedFood) {
      return res.status(404).json({ error: 'Food item not found!' });
    }
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete food item' });
  }
});

// Route to update a food item
router.put('/update-food/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price fields are required!' });
  }

  try {
    const updatedFood = await FoodItem.findByIdAndUpdate(
      id,
      { name, price, ...(imageUrl && { imageUrl }) },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ error: 'Food item not found!' });
    }

    res.status(200).json({ data: updatedFood, message: 'Food item updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update food item' });
  }
});

module.exports = router;
