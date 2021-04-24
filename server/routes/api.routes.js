const express = require("express");
const router = express.Router();
const nodeCtrl = require("../controllers/items/node")
const tokenCtrl = require("../controllers/items/token")
const authCtrl = require("../controllers/api/auth");
const checkLogin = require("../controllers/api/auth").checkLogin;



router.post("/signup", authCtrl.create);
router.post("/login", authCtrl.login);

router.use(checkLogin);

// Nodes
router.post("/campaigns/create", nodeCtrl.createNode);


// Tokens
router.post("/tokens/create/:nodeId", tokenCtrl.createToken);
router.get("/tokens/redeem/:nodeId", tokenCtrl.redeemToken);




router.get("/test", function (req, res, next) {
  console.log(req.user);
  res.status(200).json(req.user);
});
module.exports = router;
