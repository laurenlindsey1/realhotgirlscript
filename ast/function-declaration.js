module.exports = class FunctionDeclaration {
  constructor(async, type, id, params, body) {
    Object.assign(this, { async, type, id, params, body });
  }
};
