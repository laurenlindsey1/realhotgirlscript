module.exports = class Parameter {
  constructor(type, id, expression) {
    Object.assign(this, { type, id, expression });
  }
};