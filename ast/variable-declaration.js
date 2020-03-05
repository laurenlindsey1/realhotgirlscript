module.exports =   class VariableDeclaration {
    constructor(constant, id, type, expression) {
      Object.assign(this, { constant, id, type, expression });
    }
  };
