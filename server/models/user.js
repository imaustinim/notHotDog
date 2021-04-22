const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  avatar: String,
  redeemables: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Redeemable",
  }]
},{
  timestamps: true,
})

module.exports = mongoose.model("User", userSchema);