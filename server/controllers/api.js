const path = require("path")
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
  res.status(200).json({
      message: "This is a test"
  })
  const business = Business.findOne({ id: req.params.businessId})


  const newNode = new Node({
    _business: business,
    name: "test token",
    description: "This is a test token lasting from a to b",
    type: "gift card",
    address: path.join()
  })
    
}

function getNodeItem(req, res) {
  console.log(req.body)
  res.status(200).json({
      message: "This is a test"
  })
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