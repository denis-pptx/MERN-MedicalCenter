const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();


mongoose.connect('mongodb+srv://denis-pptx:gU2EF2hbKVmJfWN7@cluster0.5r0m5x1.mongodb.net/medical-center?retryWrites=true&w=majority')
    .then(() => console.log('Connected to the database'))
    .catch(err => {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    });

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
