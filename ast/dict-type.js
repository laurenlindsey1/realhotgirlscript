module.exports = class DictType {
  constructor(keyType, valueType) {
    Object.assign(this, { keyType, valueType });
  }
};
