const Type = require('./type');

module.exports = class SetType {
  constructor(setz, type) {
    Object.assign(this, { setz, type });
  }
};
