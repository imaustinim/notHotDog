const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId, ref: "User",
  },
  address: String,
  key: String,
  avatar: String,
  redeemed: {
    type: Boolean,
    default: false,
  }
},{
  timestamps: true,
})

module.exports = mongoose.model("Token", tokenSchema);