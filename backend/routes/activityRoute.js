const express = require('express');
const activityRouter = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity,
  getActivityById
} = require('../controllers/activityController');

// Create new activity
activityRouter.post('/add', protect, createActivity);

// Get all activities for logged in user
activityRouter.get('/get', protect, getActivities);

// Get single activity by ID
activityRouter.get('/getone/:id', protect, getActivityById);

// Update activity
activityRouter.put('/update/:id', protect, updateActivity);

// Delete activity
activityRouter.delete('/delete/:id', protect, deleteActivity);

module.exports = activityRouter;
