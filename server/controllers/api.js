const path = require("path")
const Business = require("../models/business")
const Node = require("../models/node")
const NodeItem = require("../models/nodeItem")
const User = require("../models/user")
const Token = require("../models/token")
require("dotenv").config({ path: "./config/config.env"});

function test(req, res) {
    console.log(req.body)
    res.status(200).json({
        message: "This is a test"
    })
}

function createNode(req, res) {
  console.log(req.body)
  // const businessId = req.params.businessId
  const business = Business.findOne({ id: 1})

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

  const newNode = new Node({
    _business: business,
    name: "test token",
    description: "This is a test token lasting from a to b",
    type: "gift card",
    address: path.join(process.env.PATH, "api", "redeem", business.id),
    quantity: 100,
    contract: {"type" : "test token"},
    nodeItems: [{}]
  })
}

function getNodeItem(req, res) {
  const nodeId = req.params.nodeId
  const node = Node.findOne({ id: nodeId })
  const newNodeItem = node
}

function redeem(req, res) {
  console.log(req.body)
  res.status(200).json({
      message: "This is a test"
  })
}

module.exports = {
  test,
  createNode,
  getNodeItem,
  redeem
}