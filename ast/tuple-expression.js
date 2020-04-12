const TupleType = require("./tuple-type");

module.exports = class TupleExpression {
  constructor(expressions) {
    this.expressions = expressions;
  }
};
