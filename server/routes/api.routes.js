const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/api");
const authCtrl = require("../controllers/api/auth");
const checkLogin = require("../controllers/api/auth").checkLogin;

router.post("/test", apiCtrl.test);

router.post("/nodes/create", apiCtrl.createNode);

router.get("/items/add/:nodeId", apiCtrl.addNodeItem);
router.post("/items/redeem/:businessId", apiCtrl.redeemItem);

router.post("/signup", authCtrl.create);
router.post("/login", authCtrl.login);

router.use(checkLogin);
router.get("/test", function (req, res, next) {
  console.log(req.user);
  res.status(200).json(req.user);
});
module.exports = router;
