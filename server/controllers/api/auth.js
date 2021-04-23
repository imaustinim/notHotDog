const User = require("../../models/user");
const Business = require("../../models/business");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;
module.exports = {
  create: signup,
  login,
  checkLogin,
};

async function signup(req, res) {
  try {
    let body = req.body;
    let user;
    //hash it up!
    body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    if (body.businessName === null) {
      delete body.businessName;
      user = await User.create(body);
    } else {
      user = await Business.create(body);
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json(token);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function login(req, res) {
  try {
    let body = req.body;
    let user;
    if (body.type === "business") {
      user = await Business.findOne({
        email: body.email,
      });
    } else {
      user = await User.findOne({
        email: body.email,
      });
    }
    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error("Invalid E-Mail or Password");

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}

function checkLogin(req, res, next) {
  // Check for the token being sent in three different ways
  let token = req.get("Authorization") || req.query.token || req.body.token;
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace("Bearer ", "");
    // Check if token is valid and not expired
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      console.log(err);
      next();
    }
  } else {
    next();
  }
}
