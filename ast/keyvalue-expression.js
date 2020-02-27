module.exports = class KeyValueExpression {
  constructor(key, value) {
    Object.assign(this, { key, value });
  }
};