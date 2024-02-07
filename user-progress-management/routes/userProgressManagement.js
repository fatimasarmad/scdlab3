
const express = require('express');
const router = express.Router();
const UserProgress = require('../models/userProgress');

router.post('/track', async (req, res) => {
  try {
    const { userId, courseId, progress } = req.body;

    let userProgress = await UserProgress.findOne({ userId, courseId });
    if (!userProgress) {
      
      userProgress = new UserProgress({
        userId,
        courseId,
        progress
      });
    } else {
     
      userProgress.progress = progress;
    }

    await userProgress.save();
    res.status(201).json({ message: 'User progress tracked successfully', userProgress });
  } catch (error) {
    console.error('Error tracking user progress:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/report', async (req, res) => {
  try {
    const { userId, courseId } = req.query;

    
    const userProgress = await UserProgress.findOne({ userId, courseId });
    if (!userProgress) {
      return res.status(404).json({ message: 'User progress not found' });
    }

    res.status(200).json({ message: 'User progress report retrieved successfully', userProgress });
  } catch (error) {
    console.error('Error retrieving user progress report:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/insights', async (req, res) => {
  try {
   
    const insights = {
      completionRate: '80%',
      engagement: 'High',
      performance: 'Above Average'
    };

    res.status(200).json({ message: 'Insights retrieved successfully', insights });
  } catch (error) {
    console.error('Error retrieving insights:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
