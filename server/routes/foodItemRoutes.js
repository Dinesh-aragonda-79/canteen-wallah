
const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const verifyToken = require('../middlewares/auth-middleware');
router.get('/all', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
});

// Get all food items for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ user: req.user._id });
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
});

// Add a new food item
router.post('/', verifyToken, async (req, res) => {
  const { shopName, foodItem, price, contact, image } = req.body;

  if (!shopName || !foodItem || !price || !contact || !image) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  const newFoodItem = new FoodItem({
    shopName,
    foodItem,
    price,
    contact,
    image,
    user: req.user._id,
  });

  try {
    const savedFoodItem = await newFoodItem.save();
    res.status(201).json(savedFoodItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add food item' });
  }
});

// Update an existing food item
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { shopName, foodItem, price, contact, image } = req.body;

  if (!shopName || !foodItem || !price || !contact || !image) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    const updatedFoodItem = await FoodItem.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { shopName, foodItem, price, contact, image },
      { new: true }
    );

    if (!updatedFoodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.status(200).json(updatedFoodItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update food item' });
  }
});

// Delete a food item
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFoodItem = await FoodItem.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deletedFoodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food item' });
  }
});

module.exports = router;