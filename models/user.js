const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const generateUniqueId = require('../utils/generateUniqueId');

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, default: generateUniqueId },
  name: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['Email', 'Google', 'Facebook'], required: true },
  role: { type: String, enum: ['Executive Officer', 'Joint', 'Joint Managing Director', 'Managing Director'], required: true },
 
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
