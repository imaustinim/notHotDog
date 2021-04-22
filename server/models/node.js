const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  _business: {
    type: mongoose.Schema.Types.ObjectId, ref: "Business",
  },
  name: String,
  description: String,
  type: {
    type: String,
    enum: ["gift card", "coupon", "ticket"]
  },
  address: String,
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
  nodeItems: [{
    type: mongoose.Schema.Types.ObjectId, ref: "NodeItem",
  }]
},{
  timestamps: true,
})

module.exports = mongoose.model("Node", nodeSchema);