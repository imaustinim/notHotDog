const path = require("path");
const generator = require("generate-password")

const User = require("../models/user")
const Business = require("../models/business")
const Node = require("../models/node")
const NodeItem = require("../models/nodeItem")
const Token = require("../models/token")
const Contract = require("../models/classes/contract");

function createNode(req, res) {
  const contract = new Contract(
    type = req.body.type,
    numUses = req.body.numUses || 1,
    value = req.body.value,
    staticDate = req.body.staticDate,
    duration = req.body.duration || null,
    currentValue = req.body.value || null,
    unit = req.body.unit || null,
    access = req.body.access || null
  )

  const business = Business.findOne({ id: req.user.id})
  const newNode = new Node({
    _business: business,
    name: "test token",
    description: "This is a test token lasting from a to b",
    type: "gift card",
    address: path.join(process.env.PATH, "api", "redeem", business.id),
    quantity: 100,
    contract: contract,
    activeDate: req.body.activeDate,
    expireDate: req.body.expireDate,
    nodeItems: []
  })

  res.send({
    success: true,
    message: "Successfully created node",
    node: newNode
  })
}


function redeemToken(req, res) {
  console.log(req.body)
  res.status(200).json({
      message: "This is a test"
  })
}

module.exports = {
  createNode,
  addNodeItem,
  redeemToken,
}