const Func = require("../ast/function-declaration");
const Param = require("../ast/parameter");
const IntType = require("../ast/int-type");

const standardFunctions = [
  new Func(IntType, "square", [new Param(IntType, "s")]),
];

standardFunctions.forEach((f) => {
  f.builtin = true;
});

module.exports = {
  standardFunctions,
};
