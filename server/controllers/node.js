const path = require("path");
const Business = require("../models/business")
const Node = require("../models/node")
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
  const node = Node.create({
    _business: business,
    name: "test token",
    description: "This is a test token lasting from a to b",
    type: "gift card",
    address: path.join(process.env.PATH, "api", "redeem", business.id),
    initialQuantity: 100,
    remainingQuantity: 100,
    redeemed: 0,
    contract: contract,
    activeDate: req.body.activeDate,
    expireDate: req.body.expireDate,
    nodeItems: []
  })
   
  res.send({
    success: true,
    message: "Successfully created node",
    node: node
  })
}

module.exports = {
  createNode,
}