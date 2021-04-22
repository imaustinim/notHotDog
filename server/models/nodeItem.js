const mongoose = require('mongoose');

const nodeItemSchema = new mongoose.Schema({
  _node: {
    type: mongoose.Schema.Types.ObjectId, ref: "Node",
  },
  key: String,
  amount: Number,
  type: {
    type: String,
    enum: ["discount", "coupon", "ticket"]
  },
  redeemed: {
    type: Boolean,
    default: false
  },
  contract: {
    type: Object,
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

module.exports = mongoose.model("NodeItem", nodeItemSchema);