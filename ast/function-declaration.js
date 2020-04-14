const FunctionObject = require("./function-object");

module.exports = class FunctionDeclaration {
  constructor(async, type, id, params, body) {
    // this.id = id;
    Object.assign(this, { async, type, id, params, body });
    // this.function = new FunctionObject(async, type, id, params, body);
  }
};
