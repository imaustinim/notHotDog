module.exports = {
  Contract,
  Coupon,
  GiftCard,
  Ticket
}

class Contract {
  constructor(static, value) {
    this.static = static;
    this.value = value;
  }
}
Contract.prototype.fulfilled = false

class Coupon extends Contract {
  constructor(unit) {
    super();
    this.unit = unit;
  }
}

class GiftCard extends Contract {
  constructor(currentValue) {
    super();
    this.currentValue = currentValue;
  }
}

class Ticket extends Contract {
  constructor(type) {
    super();
    this.type = type;
  }
}