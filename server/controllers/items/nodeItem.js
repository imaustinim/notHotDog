const User = require("../../models/user");
const Node = require("../../models/node");
const NodeItem = require("../../models/nodeItem");
const Contract = require("../../models/classes/contract");
var ObjectID = require("mongodb").ObjectID;
const io = require("socket.io-client");

module.exports = {
  getData,
  create,
  redeemToken,
  deleteToken,
};

async function getData(req, res) {
  try {
    const tokens = await NodeItem.find({ _user: req.user._id }).populate({
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
    activeDate = node.activeDate;
    expireDate = node.expireDate;

    /*     if (node.contract.staticDate) {
      activeDate = node.activeDate;
      expireDate = node.expireDate;
    } else {
      activeDate = new Date();
      expireDate = new Date().setDate(
        new Date().getDate() + node.contract.duration
      );
      if (expireDate > node.expireDate) expireDate = node.expireDate;
    } */

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
  try {
    const socket = io("http://localhost:5000/");
    if (!ObjectID.isValid(req.body.nodeItem)) {
      throw new Error("Node Item Id provided is not a valid format");
    } else if (
      new ObjectID(req.body.nodeItem).toString() !== req.body.nodeItem
    ) {
      throw new Error("Node Item Id provided is not a valid address");
    }

    let thisItem = await NodeItem.findById(req.body.nodeItem).populate("_node");
    let thisBusiness = req.user;
    const now = new Date();

    /* Check if nodeItem has been redeemed */

    if (thisItem.redeemed) {
      throw new Error("This has already been claimed");
    }
    /* Check if nodeitem is for this business: */
    if (thisItem._node._business != thisBusiness._id) {
      throw new Error("Invalid Business");
    }
    /* check if campaign is still active */
    let activeDate = new Date(thisItem.activeDate);
    let expireDate = new Date(thisItem.expireDate);
    if (now < activeDate) {
      throw new Error("Campaign is not yet active");
    }
    if (now > expireDate) {
      throw new Error("Campaign has expired");
    }

    /* Are there uses left? */
    let thisContract = thisItem.contract;

    if (thisContract.numUses > 0) {
      thisContract.numUses--;
    }
    if (thisContract.numUses === 0) {
      thisContract.redeemed = true;
      thisItem.redeemed = true;
    }

    thisItem.contract = { ...thisContract };
    thisItem.markModified("contract");

    await thisItem.save();
    await socket.emit("business-redeem", {
      id: thisItem._user,
      name: thisItem._node.name,
    });

    res.send(`Successfully Redeemed Coupon: ${thisItem._node.name}`);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function deleteToken(req, res) {
  try {
    const token = await NodeItem.findOneAndDelete({
      _id: req.params.id,
    }).populate("_node");
    res.status(200).send({
      status: 200,
      message: "Successfully delete token",
      token: token,
    });
  } catch (err) {
    res.status(400).json(err);
  }
}
