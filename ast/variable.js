module.exports = class Variable {
  constructor(constant, type, id) {
    Object.assign(this, { constant, type, id });
  }
};
