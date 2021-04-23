const path = require("path");
const Business = require("../../models/business")
const Node = require("../../models/node")
const Contract = require("../../models/classes/contract");

function createNode(req, res) {
  const contract = Contract.createContract(req.body)
  const business = Business.findOne({ id: req.user.id})
  const testNode = Node.create({
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
    node: testNode
  })
}

module.exports = {
  createNode,
}