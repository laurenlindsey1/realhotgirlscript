const Func = require("../ast/function-declaration");
const Param = require("../ast/parameter");
const IntType = require("../ast/int-type");
const LongType = require("../ast/long-type");
const StringType = require("../ast/string-type");
const PrimitiveType = require("../ast/primitive-type");

const standardFunctions = [
  new Func(null, "void", "exit", [new Param(IntType, "code", "0")]),
  new Func(null, IntType, "length", [new Param(StringType, "str", "")]),
  new Func(null, StringType, "charAt", [
    new Param(StringType, "char", ""),
    new Param(IntType, "index", "0"),
  ]),
  new Func(null, IntType, "absVal", [new Param(IntType, "num", "0")]),
  new Func(null, IntType, "square", [new Param(IntType, "num", "0")]),
];

const functions = [standardFunctions];

functions.forEach((func) => {
  func.forEach(f => {
    // eslint-disable-next-line no-param-reassign
    f.builtin = true;
  });
});

module.exports = {
  standardFunctions
};
