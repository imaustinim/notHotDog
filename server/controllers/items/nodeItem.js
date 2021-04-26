
const User = require("../../models/user");
const Node = require("../../models/node");
const NodeItem = require("../../models/nodeItem");
const Contract = require("../../models/classes/contract");

module.exports = {
  getData,
  createToken,
  redeemToken,
};

async function getData(req, res) {
  try {
    const tokens = await NodeItem.find({ _user: req.user._id })
    res.status(200).send({
      tokens: tokens
    })
  } catch(err) {
    res.status(400).json(err);
  }
}

function isNodeIdValid(nodeId) {
  try {
    if (!ObjectID.isValid(req.params.nodeId)) {
      throw new Error("nodeId provided is not a valid format");
    } else if (new ObjectId(nodeId).toString !== nodeId) {
      throw new Error("nodeId provided is not a valid address");
    } else {
      let node = Node.findOne({ id: nodeId });
      if (node.remainingQuantity <= 0) {
        throw new Error("Sorry, all of this token has been claimed!");
      }
      return node;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function createToken(req, res) {
  let node = Node.findOne({ id: req.params.nodeId });

  // Edge Case [ No remaining node items ]

  if (node.remainingQuantity === 0) {
    res.send({
      message: "Sorry, we are out of this token!",
      node: node,
    });
  }

  // Create & Add Node Item to Node Model
  let activeDate, expireDate;
  if (contractTemplate.staticDate) {
    (activeDate = node.activeDate), (expireDate = node.expireDate);
  } else {
    (activeDate = new Date()),
      (expireDate = new Date().setDate(
        new Date().getDate() + contractTemplate.duration
      ));
    if (expireDate > node.expireDate) expireDate = node.expireDate;
  }

  const contract = await Contract.createContract(req.body);
  const user = await User.findById(req.user._id)
  const nodeItem = NodeItem.create({
    _node: node,
    _user: user,
    redeemed: false,
    contract: contract,
    activeDate: activeDate,
    expireDate: expireDate,
  });
  node.nodeItems.push(nodeItem);

  res.send({
    message: "Successfully created added Token",
    nodeItem: nodeItem,
  });
}

async function redeemToken(req, res) {
  let node = Node.findById(req.params.nodeId)
  let nodeItem = nodeItem.findById(req.body.tokenId)
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
      } else if (node.expireDate < now) {
        throw({
          checkFailed: 2,
          message: "Campaing ended",
          redeemed: false
        })
      }
    await node.findOne({ "nodeItems._id" : nodeItem._id })
    .then(nodeItem => {
      // Check 3: Check if token is redeemed
      if (nodeItem.redeemed) {
        throw {
          checkFailed: 3,
          message: "Token already redeemed",
          redeemed: false,
        };
      }

      // Check 4: Check dynamic dates and current date is between nodes
      if (!nodeItem.staticDate) {
        if (nodeItem.activeDate < now) {
          throw {
            checkFailed: 4,
            message: "Can't redeem token yet",
            redeemed: false,
          };
        } else if (nodeItem.expireDate > now) {
          throw {
            checkFailed: 4,
            message: "Token expired",
            redeemed: false,
          };
        }
      }

      // Redeem token
      const newPrice = nodeItem.contract.redeem(req.body.tokenValue);
      throw {
        message: "Token Redeemed",
        contract: nodeItem.contract,
        redeemed: true,
      };
    });
  } catch (err) {
    console.log("Error", err);
    throw {
      checkFailed: 1,
      message: "Invalid Key",
      redeemed: false,
    };
  }
}
