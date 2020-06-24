const mongoose = require("mongoose");

// define Schema
const UserSchema = new mongoose.Schema({
  singer: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
  },
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  roll: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
