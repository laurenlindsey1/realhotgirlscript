// const BooleanType = require('./boolean-type.js');
// const IntegerType = require('./int-type.js');
// const LongType = require('./long-type.js');

module.exports = class UnaryExpression {
  constructor(op, operand) {
    Object.assign(this, {op, operand});
  }
};
