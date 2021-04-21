const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/api");

router.post("/test", apiCtrl.test);
router.post("/addBlock", apiCtrl.addBlock);

module.exports = router;