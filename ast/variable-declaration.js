module.exports = class VariableDeclaration {
  constructor(constant, type, ids, expressions) {
    Object.assign(this, { constant, type, ids, expressions });
  }
};
