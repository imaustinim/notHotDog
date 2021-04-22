const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/api");
const authCtrl = require("../controllers/api/auth");

router.post("/test", apiCtrl.test);

router.post("/nodes/create", apiCtrl.createNode);

router.get("/items/add/:nodeId", apiCtrl.addNodeItem);
router.post("/items/redeem/:businessId", apiCtrl.redeemItem);

router.post("/signup", authCtrl.create);

module.exports = router;
