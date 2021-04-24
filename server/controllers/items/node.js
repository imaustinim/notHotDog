const path = require("path");
const Business = require("../../models/business")
const Node = require("../../models/node")
const Contract = require("../../models/classes/contract");

function createNode(req, res) {
  const contract = Contract.createContract(req.body)
  // const business = Business.findOne({ id: req.user.id})
  const campaign = Node.create({
    _business: 2,
    name: req.body.campaignName,
    description: req.body.description,
    type: req.body.campaignType,
    address: path.join(process.env.PATH, "api", "tokens", "redeem", "1"),
    initialQuantity: req.body.quantity,
    remainingQuantity: req.body.quantity,
    redeemed: 0,
    contract: contract,
    activeDate: req.body.activeDate,
    expireDate: req.body.expireDate,
    nodeItems: []
  })

  res.send({
    success: true,
    message: "Successfully created node",
    campaign: campaign
  })
}

module.exports = {
  createNode,
}