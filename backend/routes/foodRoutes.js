const express = require('express');
const FoodItem = require('../models/FoodItem'); // Import the FoodItem model

const router = express.Router();

// Route to get all food items
router.get('/:canteenId/items', async (req, res) => {
  try {
    const canteenId = req.params.canteenId;
    // Fetch all food items from the database
    const foodItems = await FoodItem.find({canteenId});

    res.status(200).json({ data: foodItems, message: 'Food items retrieved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve food items' });
  }
});

module.exports = router;
