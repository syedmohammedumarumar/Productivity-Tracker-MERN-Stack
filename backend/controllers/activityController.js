const Activity = require('../models/Activity');
const asyncHandler = require('express-async-handler');

// @desc    Create new activity
// @route   POST /api/activities
// @access  Private
const createActivity = asyncHandler(async (req, res) => {
  const { title, description, date } = req.body;

  if (!title || !description || !date) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const activity = await Activity.create({
    title,
    description,
    date,
    user: req.user._id
  });

  res.status(201).json(activity);
});

// @desc    Get all activities for logged in user
// @route   GET /api/activities
// @access  Private
const getActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({ user: req.user._id })
    .sort({ date: -1 });
  res.json(activities);
});

// @desc    Get single activity by ID
// @route   GET /api/activities/:id
// @access  Private
const getActivityById = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    res.status(404);
    throw new Error('Activity not found');
  }

  // Check if activity belongs to logged in user
  if (activity.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to access this activity');
  }

  res.json(activity);
});

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private
const updateActivity = asyncHandler(async (req, res) => {
  const { title, description, date } = req.body;
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    res.status(404);
    throw new Error('Activity not found');
  }

  // Check if activity belongs to logged in user
  if (activity.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this activity');
  }

  activity.title = title || activity.title;
  activity.description = description || activity.description;
  activity.date = date || activity.date;

  const updatedActivity = await activity.save();
  res.json(updatedActivity);
});

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    res.status(404);
    throw new Error('Activity not found');
  }

  // Check if activity belongs to logged in user
  if (activity.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this activity');
  }

  await activity.deleteOne();
  res.json({ message: 'Activity removed' });
});

module.exports = {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity
};
