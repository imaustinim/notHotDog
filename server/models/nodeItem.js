const mongoose = require('mongoose');

const nodeItemSchema = new mongoose.Schema({
  _node: {
    type: mongoose.Schema.Types.ObjectId, ref: "Node",
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId, ref: "User",
  },
  amount: Number,
  type: {
    type: String,
    enum: ["coupon", "gift card", "ticket"]
  },
  redeemed: {
    type: Boolean,
    default: false
  },
  contract: {
    type: Object,
    immutable: false,
  },
  activeDate: {
    type: Date,
    default: new Date()
  },
  expireDate: {
    type: Date,
    default: new Date().setFullYear(new Date().getFullYear() + 1)
  },
},{
  timestamps: true,
})

module.exports = mongoose.model("Node Item", nodeItemSchema);