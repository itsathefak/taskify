const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/TaskController');

// Protect all task routes with JWT authentication
router.post('/', protect, createTask); // Create Task
router.get('/', protect, getTasks); // Get All Tasks
router.get('/:id', protect, getTaskById); // Get Task by ID
router.put('/:id', protect, updateTask); // Update Task
router.delete('/:id', protect, deleteTask); // Delete Task

module.exports = router;
