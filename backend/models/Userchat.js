const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profilePicture: String,
  role: { type: String, enum: ['student', 'professor'] },
  courses: [String],
});

module.exports = mongoose.model('UserChat', UserSchema);
