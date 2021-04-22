const generator = require("generate-password")

const User = require("../models/user")
const Node = require("../models/node")
const NodeItem = require("../models/nodeItem")
const Contract = require("../models/classes/contract");

function createNodeItem(req, res, next) {
  let node = Node.findOne({ id: req.params.nodeId })
  
  // Edge Case [ No remaining node items ]
  if (node.remainingQuantity === 0) {
    res.send({
      message: "Sorry, we are out of this token!",
      node: node
    })
  }
  
  // Generate Key
  const key = node.remainingQuantity > 0 ? key = generator.generate({length: 16, numbers: true, symbols: true, exclude: "0", strict: true}) : null
  
  // Create & Add Node Item to Node Model
  let activeDate, expireDate;
  if (contractTemplate.staticDate) {
    activeDate = node.activeDate,
    expireDate = node.expireDate
  } else {
    activeDate = new Date(),
    expireDate = new Date().setDate(new Date().getDate() + contractTemplate.duration)
    if (expireDate > node.expireDate) expireDate = node.expireDate
  }
    
  const contract = new Contract(
    type = contractTemplate.type,
    numUses = contractTemplate.numUses,
    value = contractTemplate.value,
    staticDate = contractTemplate.staticDate,
    duration = contractTemplate.duration || null,
    currentValue = contractTemplate.currentValue || null,
    unit = contractTemplate.unit || null,
    access = contractTemplate.access || null
  )

  const nodeItem = NodeItem.create({
    _node: node,
    key: key || null,
    redeemed: false,
    contract: contract,
    activeDate: activeDate,
    expireDate: expireDate,
  })
  node.nodeItems.push(nodeItem)

  // Create & Add Token to User Model
  let user = User.findOne({ id: req.user.id })

  const token = Token.create({
    _user: user,
    address: node.address,
    key: key || null,
    avatar: req.body.token.avatar,
    redeemed: false,
  })

  user.tokens.push(token)

  res.send({
    message: "Successfully created Item",
    nodeItem: nodeItem,
  })
}

module.exports = {
  createNodeItem,
}