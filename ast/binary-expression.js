module.exports = class BinaryExpression {
  constructor(left, op, right) {
    Object.assign(this, { left, op, right });
  }
};
