const TupleType = require("./tuple-type");

module.exports = class TupleExpression {
  constructor(members) {
    this.members = members;
  };
