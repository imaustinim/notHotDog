const User = require("../../models/user");
const Node = require("../../models/node");
const NodeItem = require("../../models/nodeItem");
const Contract = require("../../models/classes/contract");

module.exports = {
  getData,
  create,
  redeemToken,
  deleteToken
};

async function getData(req, res) {
  try {
    const tokens = await NodeItem.find({ _user: req.user._id })
    .populate({
      path: "_node",
      populate: {
        path: "_business",
      },
    });
    res.status(200).send({
      tokens: tokens,
    });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function isNodeIdValid(nodeId) {
  try {
    if (!ObjectID.isValid(nodeId)) {
      throw "nodeId provided is not a valid format";
    } else if (new ObjectID(nodeId).toString() !== nodeId) {
      throw "nodeId provided is not a valid address";
    } else {
      let node = await Node.findById(nodeId);
      let now = new Date();
      if (node.remainingQuantity === 0) {
        throw "Sorry, all of this token has been claimed!";
      } else if (
        new Date(node.activeDate) > now ||
        new Date(node.expireDate) < now
      ) {
        throw "nodeId provided is not within valid date range";
      }

      return node;
    }
  } catch (err) {
    return new Error(err);
  }
}
async function create(req, res) {
  try {
    let node = await isNodeIdValid(req.params.nodeId);
    if (node.constructor.name === "Error") throw node;

    // Edge Case [ No remaining node items ]

    if (node.remainingQuantity === 0) {
      res.send({
        message: "Sorry, we are out of this token!",
        node: node,
      });
      return;
    }

    // Create & Add Node Item to Node Model
    let activeDate, expireDate;
    if (node.contract.staticDate) {
      activeDate = node.activeDate;
      expireDate = node.expireDate;
    } else {
      activeDate = new Date();
      expireDate = new Date().setDate(
        new Date().getDate() + node.contract.duration
      );
      if (expireDate > node.expireDate) expireDate = node.expireDate;
    }

    const nodeItem = await NodeItem.create({
      _node: node,
      _user: req.user,
      redeemed: false,
      contract: node.contract,
      activeDate: activeDate,
      expireDate: expireDate,
    });

    res.send(nodeItem);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function redeemToken(req, res) {
  let node = Node.findById(req.params.nodeId);
  let nodeItem = nodeItem.findById(req.body.tokenId);
  const now = new Date();

  // Check 1: Token exists and key is valid
  try {
    // Check 2: Current date is between node dates
    if (node.activeDate >= now && node.expireDate <= now) {
    } else if (node.activeDate < now) {
      throw {
        checkFailed: 2,
        message: "Campaign not yet started",
        redeemed: false,
      };
    } else if (node.expireDate < now) {
      throw {
        checkFailed: 2,
        message: "Campaing ended",
        redeemed: false,
      };
    }
    await node.findOne({ "nodeItems._id": nodeItem._id }).then((nodeItem) => {
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

async function deleteToken(req, res) {
  try {
    const token = await NodeItem.findOneAndDelete({ _id: req.params._id})
    res.status(200).send({
      status: 200,
      message: "Successfully delete token",
      token: token,
    })
  } catch(err) {
    res.status(400).json(err);
  }
}