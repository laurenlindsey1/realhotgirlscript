const ArrayType = require("./array-type");

module.exports = class ArrayExpression {
  constructor(members) {
    this.members = members;
  };
