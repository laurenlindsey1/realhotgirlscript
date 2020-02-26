const BooleanType = require('./boolean-type.js');
const IntegerType = require('./int-type.js');
const LongType = require('./long-type.js');
const ConstType = require('./const-type.js');
const StringType = require('./string-type.js');


module.exports = class UnaryExpression {
  constructor(operand) {
    this.operand = operand;
  }
};
