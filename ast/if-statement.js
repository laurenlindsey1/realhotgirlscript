module.exports = class IfElseStatement {
  constructor(tests, consequents, alternate) {
    Object.assign(this, { tests, consequents, alternate });
  }
};
