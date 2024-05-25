const mongoose = require('mongoose'); // Ensure mongoose is imported

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://kmass8754:karthick877@karthicktask.bbjj1ye.mongodb.net/QUANTZI', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
