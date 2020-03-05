module.exports = class TupleType {
  constructor(tup, tupletype, othertype) {
    Object.assign(this, { tup, tupletype, othertype });
  }
};
