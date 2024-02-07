// app.js
const express = require('express');
const mongoose = require('mongoose');
const enrollmentManagementRoutes = require('./routes/enrollmentManagement');

const app = express();
const PORT = process.env.PORT || 3002;


app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/lab3').
    then(() => console.log('Connected to MongoDB')).
    catch(err => console.error(err));
app.use('/api/enrollment', enrollmentManagementRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
