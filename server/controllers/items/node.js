const path = require("path");
const Business = require("../../models/business")
const Node = require("../../models/node")
const Contract = require("../../models/classes/contract");

async function createNode(req, res) {
  const contract = Contract.createContract(req.body)
  const business = await Business.findById(req.user._id)
  const campaign = await Node.create({
    _business: business._id,
    name: req.body.campaignName,
    description: req.body.description,
    type: req.body.campaignType,
    address: path.join(process.env.URL, "api", "tokens", "redeem", business._id.toString()),
    initialQuantity: req.body.quantity,
    remainingQuantity: req.body.quantity,
    redeemed: 0,
    contract: contract,
    activeDate: req.body.activeDate,
    expireDate: req.body.expireDate,
    nodeItems: []
  })
  console.log(campaign)

  res.send({
    success: true,
    message: "Successfully created node",
    campaign: campaign
  })
}

module.exports = {
  createNode,
}