// models/assessment.js
const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
