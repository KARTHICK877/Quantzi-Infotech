const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const personalDetailsRoutes = require('./routes/personalDetailsRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Function to dynamically import chalk
async function importChalk() {
  const chalk = await import('chalk');
  return chalk.default;
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    const chalk = await importChalk();
    console.log(chalk.green('MongoDB connected'));
  })
  .catch(async err => {
    const chalk = await importChalk();
    console.log(chalk.red(err));
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/personal-details', personalDetailsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  const chalk = await importChalk();
  console.log(chalk.blue(`Server is running on port ${PORT}`));
});
