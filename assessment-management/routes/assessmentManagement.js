
const express = require('express');
const router = express.Router();
const Assessment = require('../models/assessment');

router.post('/', async (req, res) => {
  try {
    const { courseId, title, description, deadline } = req.body;
    const newAssessment = new Assessment({
      courseId,
      title,
      description,
      deadline
    });
    await newAssessment.save();
    res.status(201).json({ message: 'Assessment created successfully', assessment: newAssessment });
  } catch (error) {
    console.error('Error creating assessment:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline } = req.body;
    const updatedAssessment = await Assessment.findByIdAndUpdate(id, {
      title,
      description,
      deadline
    }, { new: true });
    if (!updatedAssessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    res.status(200).json({ message: 'Assessment updated successfully', assessment: updatedAssessment });
  } catch (error) {
    console.error('Error updating assessment:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAssessment = await Assessment.findByIdAndDelete(id);
    if (!deletedAssessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    res.status(200).json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assessment:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
