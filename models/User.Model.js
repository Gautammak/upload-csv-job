
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
