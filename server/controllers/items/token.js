const generator = require("generate-password")

const User = require("../../models/user")
const Node = require("../../models/node")
const NodeItem = require("../../models/nodeItem")
const Token = require("../../models/Token")
const Contract = require("../../models/classes/contract");

module.exports = {
  createToken,
  redeemToken
}

function createToken(req, res) {
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

  const contract = Contract.createContract(req.body)
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
    message: "Successfully created added Token",
    nodeItem: nodeItem,
  })
}

async function redeemToken(req, res) {
  let node = Node.findOne({ id: req.params.nodeId })
  let token = Token.findOne({ id: req.body.tokenId })
  const now = new Date()
  
  // Check 1: Token exists and key is valid
  try {
      // Check 2: Current date is between node dates
      if (node.activeDate >= now && node.expireDate <= now) {
      } else if (node.activeDate < now) {
        throw({
          checkFailed: 2,
          message: "Campaign not yet started",
          redeemed: false,
        })
        return
      } else if (node.expireDate < now) {
        throw({
          checkFailed: 2,
          message: "Campaing ended",
          redeemed: false
        })
        return
      }

    await node.findOne({ "nodeItems.key" : token.key })
    .then(nodeItem => {
      // Check 3: Check if token is redeemed
      if (nodeItem.redeemed) {
        throw({
          checkFailed: 3,
          message: "Token already redeemed",
          redeemed: false
        })
      }

      // Check 4: Check dynamic dates and current date is between nodes 
      if (!nodeItem.staticDate) {
        if (nodeItem.activeDate < now) {
          throw({
            checkFailed: 4,
            message: "Can't redeem token yet",
            redeemed: false,
          })
          return
        } else if (nodeItem.expireDate > now) {
          throw({
            checkFailed: 4,
            message: "Token expired",
            redeemed: false,
          })
          return
        }
      }

      // Redeem token
      const newPrice = nodeItem.contract.redeem(req.body.tokenValue)
      throw({
        message: "Token Redeemed",
        contract: nodeItem.contract,
        redeemed: true,
      })
    })
  } catch(err) {
    console.log("Error", err)
    throw({
      checkFailed: 1,
      message: "Invalid Key",
      redeemed: false
    })
  }
}