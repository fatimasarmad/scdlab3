
const express = require('express');
const router = express.Router();
const FeedbackSurvey = require('../models/feedbackSurvey');


router.post('/feedback', async (req, res) => {
  try {
    const { userId, courseId, feedback, rating } = req.body;

    const newFeedbackSurvey = new FeedbackSurvey({
      userId,
      courseId,
      feedback,
      rating
    });
    await newFeedbackSurvey.save();

    res.status(201).json({ message: 'Feedback submitted successfully', feedbackSurvey: newFeedbackSurvey });
  } catch (error) {
    console.error('Error submitting feedback:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;

  
    const feedbackSurveys = await FeedbackSurvey.find({ courseId });
    res.status(200).json({ message: 'Feedback surveys retrieved successfully', feedbackSurveys });
  } catch (error) {
    console.error('Error retrieving feedback surveys:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/instructor/:instructorId', async (req, res) => {
  try {
    const { instructorId } = req.params;

   
    const feedbackSurveys = await FeedbackSurvey.find({ instructorId });
    res.status(200).json({ message: 'Feedback surveys retrieved successfully', feedbackSurveys });
  } catch (error) {
    console.error('Error retrieving feedback surveys:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
