const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/api");

router.post("/test", apiCtrl.test);

module.exports = router;