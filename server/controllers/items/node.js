const path = require("path");
const Business = require("../../models/business");
const Node = require("../../models/node");
const Contract = require("../../models/classes/contract");
const { createContract } = require("../../models/classes/contract");

async function createNode(req, res) {
  const contract = createContract(req.body);
  let business = await Business.findById(req.user._id);
  const campaign = await Node.create({
    _business: business._id,
    name: req.body.campaignName,
    description: req.body.description,
    type: req.body.campaignType,
    initialQuantity: req.body.quantity,
    remainingQuantity: req.body.quantity,
    redeemed: 0,
    contract: contract,
    activeDate: req.body.activeDate,
    expireDate: req.body.expireDate,
    nodeItems: [],
  });

  business.nodes.push(campaign._id);
  business.save();

  res.status(200).send({
    status: 200,
    message: "Successfully created node",
    campaign: campaign,
  });
}

async function editNode(req, res) {
  let node = await Node.findById(req.params.id);
  node.name = req.body.campaignName;
  node.description = req.body.description;
  // campaign.initialQuantity = req.body.initialQuantity,
  // campaign.remainingQuantity = req.body.remainingQuantity,
  node.activeDate = req.body.activeDate;
  node.expireDate = req.body.expireDate;
  node.contract = createContract(req.body);
  node.save();

  res.status(200).send({
    status: 200,
    message: "Successfully edited campaign",
    campaign: node,
  });
}

async function deleteNode(req, res) {
  const contract = Contract.createContract(req.body);
  let business = await Business.findById(req.user._id);
  const campaign = await Node.create({
    _business: business._id,
    name: req.body.campaignName,
    description: req.body.description,
    type: req.body.campaignType,
    initialQuantity: req.body.quantity,
    remainingQuantity: req.body.quantity,
    redeemed: 0,
    contract: contract,
    activeDate: req.body.activeDate,
    expireDate: req.body.expireDate,
    nodeItems: [],
  });

  business.nodes.push(campaign._id);
  business.save();

  res.status(200).send({
    status: 200,
    message: "Successfully created node",
    campaign: campaign,
  });
}

async function getNodes(req, res) {
  try {
    const business = await Business.findById(req.user._id);
    const nodes = await Node.find({ _business: business._id });
    res.status(200).send({
      nodes: nodes,
    });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getNode(req, res) {
  try {
    const node = await Node.findById(req.params.id);
    res.status(200).send({
      node: node,
    });
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  createNode,
  editNode,
  deleteNode,
  getNode,
  getNodes,
};
