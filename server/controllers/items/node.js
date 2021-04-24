const path = require("path");
const Business = require("../../models/business")
const Node = require("../../models/node")
const Contract = require("../../models/classes/contract");

function createNode(req, res) {
  console.log(req.user)
  const contract = Contract.createContract(req.body)

  const business = Business.findOne({ _id: req.user._id})
  const campaign = Node.create({
    _business: business._id,
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
  console.log(campaigns)

  res.send({
    success: true,
    message: "Successfully created node",
    campaign: campaign
  })
}

module.exports = {
  createNode,
}