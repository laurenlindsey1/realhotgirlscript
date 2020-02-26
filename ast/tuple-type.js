const Type = require('./type');

module.exports = class TupleType {
  constructor(tupleType) {
    Object.assign(this, { tupleType });
  };
