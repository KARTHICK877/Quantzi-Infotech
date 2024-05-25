const express = require('express');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const personalDetailsRoutes = require('./routes/personalDetailsRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/personal-details', personalDetailsRoutes);


app.get('/', (req, res) => {
    res.send('task is working good');
  });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
