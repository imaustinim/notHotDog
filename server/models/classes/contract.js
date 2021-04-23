class Contract {
  constructor(type, numUses=1, value=0, staticDate=false, duration=null) {
    this.type = type;
    this.numUses = numUses
    this.value = value;
    this.staticDate = staticDate;
    this.duration = duration;
    this.redeemed = false;
  }
}

class Coupon extends Contract {
  constructor(type, numUses, value, staticDate, duration, unit) {
    super(type, numUses, value, staticDate, duration);
    this.unit = unit
  }

  redeem(price) {
    if (this.numUses > 0) {
      this.numUses--
      if (this.numUses === 0) this.redeemed = true
    }
    
    if (this.unit == "%") {
      return (1 - this.value) * price
    } else if (this.unit == "$") {
      return price - this.value
    }
  }
}

class GiftCard extends Contract {
  constructor(type, value, staticDate, duration, remainingValue) {
    super(type, numUses, value, staticDate, duration);
    this.remainingValue = remainingValue
  }

  redeem(price) {
    if (price - this.remainingValue > 0) {
      this.remainingValue = 0
      return price - this.remainingValue
    } else {
      this.remainingValue-= price
      this.redeemed = true
      return 0
    }
  }
}

class Ticket extends Contract {
  constructor(type, numUses, value, staticDate, duration, access) {
    super(type, numUses, value, staticDate, duration);
    this.access = access
  }

  redeem(access) {
    if (this.access === access) {
      if (this.numUses > 0) {
        this.numUses--
        if (this.numUses === 0) this.redeemed = true
      }
      return true
    }
    return false
  }
}

function createContract(body) {
  const obj = {
    type: body.type,
    numUses: body.numUses || 1,
    value: body.value,
    staticDate: body.staticDate,
    duration: body.duration || null,
    remainingValue: body.value || null,
    unit: body.unit || null,
    access: body.access || null
  }
  
  switch (obj.type) {
    case "coupon":
      return new Contract.Coupon(obj.type, obj.numUses, obj.value, obj.staticDate, obj.duraction, obj.unit)
    case "gift card":
      return new Contract.GiftCard(obj.type, obj.numUses, obj.value, obj.staticDate, obj.duraction, obj.remainingValue)
    case "ticket":
      return new Contract.Ticket(obj.type, obj.numUses, obj.value, obj.staticDate, obj.duraction, obj.access )
  }
}

module.exports = {
  Default:Contract,
  Coupon,
  GiftCard,
  Ticket,

  createContract
}