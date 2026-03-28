const FoodItem = require('../models/FoodItem');

const getAllFoodItems = async (req, res, next) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    next(error);
  }
};

const getUserFoodItems = async (req, res, next) => {
  try {
    const foodItems = await FoodItem.find({ user: req.user._id });
    res.status(200).json(foodItems);
  } catch (error) {
    next(error);
  }
};

const addFoodItem = async (req, res, next) => {
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
    next(error);
  }
};

const updateFoodItem = async (req, res, next) => {
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
    next(error);
  }
};

const deleteFoodItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedFoodItem = await FoodItem.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deletedFoodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFoodItems,
  getUserFoodItems,
  addFoodItem,
  updateFoodItem,
  deleteFoodItem
};
