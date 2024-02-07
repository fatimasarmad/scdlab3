
const mongoose = require('mongoose');

const feedbackSurveySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

const FeedbackSurvey = mongoose.model('FeedbackSurvey', feedbackSurveySchema);

module.exports = FeedbackSurvey;
