const Func = require('../ast/function-object');
const PrimitiveType = require('../ast/primitive-type');
const Param = require('../ast/parameter');

const IntType = new PrimitiveType('digitz');
const LongType = new PrimitiveType('longz');
const StringType = new PrimitiveType('wordz');
const BoolType = new PrimitiveType('boolz');
const NoneType = new PrimitiveType('deceasedOnYouHoes');

const standardFunctions = [new Func(IntType, 'square', [new Param(IntType, 's')])];

standardFunctions.forEach(f => {
  f.builtin = true;
});

module.exports = {
  IntType,
  LongType,
  StringType,
  BoolType,
  NoneType,
  standardFunctions,
};
