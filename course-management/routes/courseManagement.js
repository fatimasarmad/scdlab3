
const express = require('express');
const router = express.Router();
const Course = require('../models/course');


router.post('/', async (req, res) => {
  try {
    const { title, description, instructor, duration, schedule, prerequisites } = req.body;
    const newCourse = new Course({
      title,
      description,
      instructor,
      duration,
      schedule,
      prerequisites
    });
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error('Error creating course:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, instructor, duration, schedule, prerequisites } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(id, {
      title,
      description,
      instructor,
      duration,
      schedule,
      prerequisites
    }, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
