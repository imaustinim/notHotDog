const sha512 = require("js-sha512");

class CryptoBlockchain {
  constructor() {
    this.blockchain = [this.startBlockchain()];
  }

  startBlockchain() {
    let dict = {};
    dict["name"] = {
      address: "address",
      key: "key",
      type: "type",
      quantity: "quantity",
      updatedAt: Date.now(),
      createdAt: Date.now()
    }
    return new CryptoBlock(0, Date.now(), dict,0)
  }

  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length -1];
  }

  addNewBlock(newBlock) {
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    newBlock.hash = newBlock.computeHash();
    this.blockchain.push(newBlock);
  }
}

class CryptoBlock {
  constructor(index, timestamp, data, precedingHash=" ") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
  }

  computeHash() {
    return sha512(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

// class Data {
//   constructor(nickname, address, key, type, quantity, createdAt, updatedAt) {
//     this.nickname = nickname;
//     this.address = address;
//     this.key = key;
//     this.type = type;
//     this.quantity = quantity;
//     this.createdAt = createdAt;
//     this.updatedAt = updatedAt;
//   }
// }

module.exports = {
  CryptoBlockchain,
  CryptoBlock,
  // Data
}