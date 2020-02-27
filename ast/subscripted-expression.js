module.exports = class SubscriptedExpression {
  constructor(varexp, subscript) {
    Object.assign(this, { varexp, subscript });
  }
};