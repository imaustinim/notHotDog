const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/api");

router.post("/test", apiCtrl.test);

router.post("/create/", apiCtrl.createNode);

router.post("/get/", apiCtrl.getNodeItem);

router.post("/redeem/:businessId", apiCtrl.redeem);

module.exports = router;