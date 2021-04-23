const express = require("express");
const router = express.Router();
const nodeCtrl = require("../controllers/items/node")
const tokenCtrl = require("../controllers/items/token")
const authCtrl = require("../controllers/api/auth");

// Nodes
router.post("/nodes/create", nodeCtrl.createNode);


// Tokens
router.post("/tokens/create/:nodeId", tokenCtrl.createToken);
router.get("/tokens/redeem/:nodeId", tokenCtrl.redeemToken);

router.post("/signup", authCtrl.create);

module.exports = router;
