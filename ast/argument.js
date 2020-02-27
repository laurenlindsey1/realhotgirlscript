module.exports = class Argument {
  constructor(type, id, expression) {
    Object.assign(this, { type, id, expression });
  }
};