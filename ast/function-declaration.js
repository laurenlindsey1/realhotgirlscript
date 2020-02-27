module.exports = class FunctionDeclaration {
  constructor(async, type, id, params, body) {
    // WHERE TO ADD VOID IN HERE?
    Object.assign(this, { async, type, id, params, body });
  }
};