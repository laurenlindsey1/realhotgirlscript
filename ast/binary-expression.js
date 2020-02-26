module.exports = class BinaryExpression {
  constructor(op, left, right) {
    Object.assign(this, {op, left, right});
  }
};
