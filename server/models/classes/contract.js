class Contract {
  constructor(type, numUses=1, value=0, staticDate=false, duration=null, currentValue=null, unit=null, access=null) {
    this.type = type;
    this.numUses = numUses
    this.value = value;
    this.staticDate = staticDate;
    this.fulfilled = false;
    this.duration = duration;

    // optional
    this.currentValue = currentValue;
    this.unit = unit;
    this.access = access;
  }
}

module.exports = Contract