const bc = require("../models/cryptoblock");
const sha512 = require("js-sha512");
let chain = new bc.CryptoBlockchain();

function test(req, res) {
    console.log(req.body)
    res.status(200).json({
        message: "This is a test"
    })
}

function addBlock(req, res) {
  let dict = chain.blockchain[chain.blockchain.length-1].data
  const newData = {
    address: req.body.address,
    key: req.body.key,
    type: req.body.type,
    quantity: req.body.quantity,
    updatedAt: Date.now(),
    createdAt: Date.now()
  }
  dict[req.body.name] = newData
  chain.addNewBlock(new bc.CryptoBlock(
    index = chain.blockchain.length,
    timestamp = Date.now(),
    data = dict,
  ))
  console.log(chain.blockchain)
  res.status(200).json({
    message: "success",
    block: newData,
    name: req.body.name
  })
}

module.exports = {
  test,
  addBlock
}
