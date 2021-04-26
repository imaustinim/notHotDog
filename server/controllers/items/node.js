const path = require("path");
const Business = require("../../models/business")
const Node = require("../../models/node")
const Contract = require("../../models/classes/contract");

async function createNode(req, res) {
  const contract = Contract.createContract(req.body)
  let business = await Business.findById(req.user._id)
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

  business.nodes.push(campaign._id)
  business.save()

  res.status(200).send({
    status: 200,
    message: "Successfully created node",
    campaign: campaign
  })
}

async function editCampaign(req, res) {
  let business = await Business.findById(req.user._id)
  let campaign = await Node.findById(req.params.campaignId)
  campaign({
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
  campaign.save()

  res.status(200).send({
    status: 200,
    message: "Successfully edited campaign",
    campaign: campaign
  })
}

async function deleteCampaign(req, res) {
  const contract = Contract.createContract(req.body)
  let business = await Business.findById(req.user._id)
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

  business.nodes.push(campaign._id)
  business.save()

  res.status(200).send({
    status: 200,
    message: "Successfully created node",
    campaign: campaign
  })
}

async function getData(req, res) {
  try {
    const business = await Business.findById(req.user._id)
    const nodes = await Node.find({ _business: business._id })
    res.status(200).send({
      nodes: nodes
    })
  } catch(err) {
    res.status(400).json(err);
  }
}

module.exports = {
  createNode,
  getData
}