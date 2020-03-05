const Type = require('./type');

module.exports = class ArrayType {
  constructor(arr, type) {
    Object.assign(this, { arr, type });
  }
};
