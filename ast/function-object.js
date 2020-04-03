const Parameter = require("./parameter");
const ReturnStatement = require("./return-statement");

module.exports = class FunctionObject {
  constructor(type, id, params, body) {
    Object.assign(this, { type, id, params, body });
  }
};