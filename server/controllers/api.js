const path = require("path");
require("dotenv").config({ path: "./config/config.env"});
const generator = require("generate-password")

const Business = require("../models/business")
const Node = require("../models/node")
const NodeItem = require("../models/nodeItem")
const User = require("../models/user")
const Token = require("../models/token")

function test(req, res) {
    console.log(req.body)
    res.status(200).json({
        message: "This is a test"
    })
}

function createNode(req, res) {
  console.log(req.body)
  const business = Business.findOne({ id: req.user.id})

  let contract
  switch (req.body.type) {
    case "gift card":
      contract = {
        static: req.body.static,
        value: req.body.amount,
      }
      break;
    case "coupon":
      contract = {
        static: req.body.static,
        value: req.body.amount,
        unit: req.body.unit
      }
      break;
    case "ticket":
      contract = {
        static: req.body.static,
        accessType: req.body.seatType,
        value: req.body.value
      }
  }
  if (!req.body.static) contract["duration"] = req.body.duration

  const newNode = new Node({
    _business: business,
    name: "test token",
    description: "This is a test token lasting from a to b",
    type: "gift card",
    address: path.join(process.env.PATH, "api", "redeem", business.id),
    quantity: 100,
    contract: {"type" : "test token"},
    nodeItems: []
  })

  res.send({
    success: true,
    message: "Successfully created node",
    node: newNode
  })
}

function addNodeItem(req, res) {
  const nodeId = req.params.nodeId
  let node = Node.findOne({ id: nodeId })
  const contractTemplate = node.contract
  const key = generator.generate({length: 16, numbers: true, symbols: true, exclude: "0", strict: true})

  let activeDate, expireDate;
  if (contractTemplate.static) {
    activeDate = node.activeDate,
    expireDate = node.activeDate
  } else {
    activeDate = new Date(),
    expireDate = new Date().setDate(new Date().getDate() + contractTemplate.duration)
  }

  let contract
  switch (node.type) {
    case "gift card":
      contract = {
        static: contractTemplate.static,
        value: contractTemplate.value,
        currentValue: contractTemplate.value,
      }
      break;
    case "coupon":
      contract = {
        static: contractTemplate.static,
        value: contractTemplate.value,
        unit: contractTemplate.unit
      }
      break;
    case "ticket":
      contract = {
        static: contractTemplate.static,
        seatType: contractTemplate.seatType,
        value: req.body.value
      }
  }
  const newNodeItem = new NodeItem({
    _node: node.id,
    key: key,
    redeemed: false,
    contract: contract,
    activeDate: activeDate,
    expireDate: expireDate,
  })
  // let contract;
  // switch (req.body.type) {
  //   case "gift card":
  //     contract = {
  //       static: req.body.static,
  //       amount: req.body.amount,
  //     }
  //     break;
  //   case "coupon":
  //     contract = {
  //       static: req.body.static,
  //       amount: req.body.amount,
  //       unit: req.body.unit
  //     }
  //     break;
  //   case "ticket":
  //     contract = {
  //       static: req.body.static,
  //       row: req.body.row,
  //       seat: req.body.seat,
  //       seatType: req.body.seatType,
  //       value: req.body.value
  //     }
  // }
}

function redeemItem(req, res) {
  console.log(req.body)
  res.status(200).json({
      message: "This is a test"
  })
}

module.exports = {
  test,
  createNode,
  addNodeItem,
  redeemItem
}