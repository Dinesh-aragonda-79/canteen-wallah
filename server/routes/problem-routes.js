// routes/problem.js
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/auth-middleware');
const problemController = require('../controllers/problem-controller');

// Get problems by category for a specific user
router.get('/:category', authenticateUser, problemController.getProblemsByCategory);

// Create a new problem
router.post('/', authenticateUser, problemController.createProblem);

// Update a problem
router.put('/:id', authenticateUser, problemController.updateProblem);

// Delete a problem
router.delete('/:id', authenticateUser, problemController.deleteProblem);

module.exports = router;
