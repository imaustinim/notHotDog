const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  businessName: String,
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  nodes: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Node",
  }]
},{
  timestamps: true,
})

module.exports = mongoose.model("Business", businessSchema);