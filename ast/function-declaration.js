module.exports = class FunctionDeclaration {
    constructor(type, id, params, body) {
      Object.assign(this, { type, id, params, body });
    }
};
