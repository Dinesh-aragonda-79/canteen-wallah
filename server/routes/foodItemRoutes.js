const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth-middleware');
const foodItemController = require('../controllers/foodItem-controller');

router.get('/all', foodItemController.getAllFoodItems);

// Get all food items for the logged-in user
router.get('/', verifyToken, foodItemController.getUserFoodItems);

// Add a new food item
router.post('/', verifyToken, foodItemController.addFoodItem);

// Update an existing food item
router.put('/:id', verifyToken, foodItemController.updateFoodItem);

// Delete a food item
router.delete('/:id', verifyToken, foodItemController.deleteFoodItem);

module.exports = router;