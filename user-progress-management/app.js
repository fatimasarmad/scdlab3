// app.js
const express = require('express');
const mongoose = require('mongoose');
const userProgressManagementRoutes = require('./routes/userProgressManagement');

const app = express();
const PORT = process.env.PORT || 3004;


mongoose.connect('mongodb://127.0.0.1:27017/lab3').
    then(() => console.log('Connected to MongoDB')).
    catch(err => console.error(err));




app.use(express.json());

app.use('/api/user-progress', userProgressManagementRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
