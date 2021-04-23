const User = require("../../models/user");
const Business = require("../../models/business");
const jwt = require("jsonwebtoken");
module.exports = {
  create: userCreate,
};

async function userCreate(req, res) {
  try {
    let body = req.body;
    let user;
    if (body.businessName === null) {
      delete body.businessName;
      user = await User.create(body);
    } else {
      user = await Business.create(body);
    }
    console.log(user);
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json(token);
  } catch (err) {
    res.status(400).send(err);
  }
}
