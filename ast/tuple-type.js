const Type = require('./type');

module.exports = class TupleType {
  constructor(tup, tupleType) {
    Object.assign(this, { tup, tupleType });
  }
};
