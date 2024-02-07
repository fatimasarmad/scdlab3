// routes/enrollmentManagement.js
const express = require('express');
const router = express.Router();
const Enrollment = require('../models/enrollment');
const Course = require('../models/course');

// Enroll User Route
router.post('/enroll', async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check course capacity
    if (course.capacity <= course.enrolledStudents.length) {
      // If course is full, add user to waitlist
      course.waitlist.push(userId);
      await course.save();
      return res.status(200).json({ message: 'Course is full, added to waitlist' });
    }

    // Enroll user in course
    const enrollment = new Enrollment({
      courseId,
      userId,
      status: 'enrolled'
    });
    await enrollment.save();

    // Update course enrollment
    course.enrolledStudents.push(userId);
    await course.save();

    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Withdraw User Route
router.post('/withdraw', async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    // Check if enrollment exists
    const enrollment = await Enrollment.findOneAndDelete({ courseId, userId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Remove user from course enrollment
    const course = await Course.findById(courseId);
    course.enrolledStudents = course.enrolledStudents.filter(id => id !== userId);
    await course.save();

    // Check if there are users on waitlist
    if (course.waitlist.length > 0) {
      const nextUser = course.waitlist.shift();
      course.enrolledStudents.push(nextUser);
      await course.save();
      res.status(200).json({ message: 'Withdrawn successfully, next user enrolled from waitlist' });
    } else {
      res.status(200).json({ message: 'Withdrawn successfully' });
    }
  } catch (error) {
    console.error('Error withdrawing user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
