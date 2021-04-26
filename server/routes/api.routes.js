const express = require("express");
const router = express.Router();
const nodeCtrl = require("../controllers/items/node")
const nodeItemCtrl = require("../controllers/items/nodeItem")
const authCtrl = require("../controllers/api/auth");
const checkLogin = require("../controllers/api/auth").checkLogin;

router.post("/signup", authCtrl.create);
router.post("/login", authCtrl.login);

router.use(checkLogin);

// Nodes
router.post("/campaigns/create", nodeCtrl.createNode);
router.post("/campaigns/:id/edit", nodeCtrl.editNode);
router.get("/campaigns/:id/delete", nodeCtrl.deleteNode);
router.get("/campaigns/getNodes", nodeCtrl.getNodes);
router.get("/campaigns/:id", nodeCtrl.getNode);

// Tokens
router.get("/tokens/getData", nodeItemCtrl.getData);
router.get("/tokens/:id/delete", nodeItemCtrl.deleteToken);
router.post("/tokens/create/:nodeId", nodeItemCtrl.createToken);
router.get("/tokens/redeem/:nodeId", nodeItemCtrl.redeemToken);

router.get("/test", function (req, res, next) {
  console.log(req.user);
  res.status(200).json(req.user);
});
module.exports = router;
