const User = require("../models/user")
const NodeItem = require("../models/nodeItem")
const Token = require("../models/token")

function redeemToken(req, res) {
  console.log(req.body)
  res.status(200).json({
      message: "This is a test"
  })
}

module.exports = {
  redeemToken,
}