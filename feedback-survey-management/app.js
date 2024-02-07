// app.js
const express = require('express');
const mongoose = require('mongoose');
const feedbackSurveyManagementRoutes = require('./routes/feedbackSurveyManagement');

const app = express();
const PORT = process.env.PORT || 3005;
mongoose.connect('mongodb://127.0.0.1:27017/lab3').
    then(() => console.log('Connected to MongoDB')).
    catch(err => console.error(err));

app.use(express.json());

app.use('/api/feedback-survey', feedbackSurveyManagementRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
a