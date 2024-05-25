const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  qualification: { type: String, required: true },
  since: { type: Date, required: true },
  to: { type: Date, required: true },
  percentage: { type: Number, required: true },
  completed: { type: Boolean, required: true }
});

const personalDetailsSchema = new mongoose.Schema({
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  street: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
  educationDetails: [educationSchema],
  userId: { type: String, required: true, unique: true },
});

const PersonalDetails = mongoose.model('PersonalDetails', personalDetailsSchema);

module.exports = PersonalDetails;
