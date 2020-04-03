const Func = require("../ast/function-object");
const PrimitiveType = require("../ast/primitive-type");
const Param = require("../ast/parameter");


const IntType = new PrimitiveType("digitz");
const LongType = new PrimitiveType("longz");
const StringType = new PrimitiveType("string");
const ConstType = new PrimitiveType("stayz");
const BoolType = new PrimitiveType("boolz");
const NoneType = new PrimitiveType("none");

const standardFunctions = [
    // not sure if this is how we should be declaring new Param
    // since our parameter.js takes in type, id, expression
    // Casper's grammar takes in id, type, exp but their parameter.js only needs type, id??
  new Func("supLilBitch", [new Param("s", StringType)]),
  
  // continue? negate? void?
  

  // new Func('size', [new Param('s', StringType)], IntType),
  // new Func(
  //   'substring',
  //   [new Param('s', StringType), new Param('first', IntType), new Param('n', IntType)],
  //   StringType
  // ),
];

/* eslint-disable no-param-reassign */
standardFunctions.forEach(f => {
  f.builtin = true;
});
/* eslint-enable no-param-reassign */

module.exports = {
  IntType,
  LongType,
  StringType,
  ConstType,
  BoolType,
  NoneType,
  standardFunctions
};
