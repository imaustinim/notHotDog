const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  avatar: String,
  tokens: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Token",
  }]
},{
  timestamps: true,
})

module.exports = mongoose.model("User", userSchema);