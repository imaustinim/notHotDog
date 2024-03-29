const express = require("express");
const router = express.Router();
const nodeCtrl = require("../controllers/items/node");
const nodeItemCtrl = require("../controllers/items/nodeItem");
const authCtrl = require("../controllers/api/auth");
const checkLogin = require("../controllers/api/auth").checkLogin;

router.post("/signup", authCtrl.create);
router.post("/login", authCtrl.login);

// client-side
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
router.get("/tokens/create/:nodeId", nodeItemCtrl.create);
router.post("/tokens/redeem", nodeItemCtrl.redeemToken);
router.get("/tokens/:id", nodeItemCtrl.getOne);

router.get("/test", function (req, res, next) {
  console.log(req.user);
  const io = req.app.get("socketio");
  console.log("OK");
  io.emit("business-redeem");
  res.status(200).json(req.user);
});
module.exports = router;
