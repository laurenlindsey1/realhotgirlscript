const Type = require('./type');

module.exports = class DictType {
  constructor(dictz, keytype, valuetype) {
    Object.assign(this, { dictz, keytype, valuetype });
  }
};
