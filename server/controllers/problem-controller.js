const Problem = require('../models/problem');

const getProblemsByCategory = async (req, res, next) => {
  try {
    const problems = await Problem.find({ category: req.params.category, user: req.user._id });
    res.status(200).json(problems);
  } catch (err) {
    next(err);
  }
};

const createProblem = async (req, res, next) => {
  try {
    const newProblem = new Problem({ ...req.body, user: req.user._id });
    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (err) {
    next(err);
  }
};

const updateProblem = async (req, res, next) => {
  try {
    const updatedProblem = await Problem.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProblem);
  } catch (err) {
    next(err);
  }
};

const deleteProblem = async (req, res, next) => {
  try {
    await Problem.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProblemsByCategory,
  createProblem,
  updateProblem,
  deleteProblem
};
