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
router.post("/nodes/create", nodeCtrl.createNode);


// Tokens
router.post("/tokens/create/:nodeId", tokenCtrl.createToken);
router.get("/tokens/redeem/:nodeId", tokenCtrl.redeemToken);



<<<<<<< HEAD
router.use(checkLogin);
=======
>>>>>>> 75e21a301166440608b44d6fdfac5f4dcca86efa

router.get("/test", function (req, res, next) {
  console.log(req.user);
  res.status(200).json(req.user);
});
module.exports = router;
