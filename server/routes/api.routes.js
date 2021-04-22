const express = require("express");
const router = express.Router();
const nodeCtrl = require("../controllers/node")
const nodeItemCtrl = require("../controllers/nodeItem")
const tokenCtrl = require("../controllers/token")

// Nodes
router.post("/nodes/create", nodeCtrl.createNode);


// Node Items
router.get("/items/add/:nodeId", nodeItemCtrl.createNodeItem);


// Tokens
router.post("/items/redeem/:businessId", tokenCtrl.redeemToken);

module.exports = router;