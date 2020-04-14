const Parameter = require("./parameter");
const ReturnStatement = require("./return-statement");

module.exports = class FunctionObject {
  constructor(async, type, id, params, body) {
    Object.assign(this, { async, type, id, params, body });
  }
};
