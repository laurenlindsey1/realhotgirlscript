const { Func, Param, PrimitiveType } = require('../ast');

const IntType = new PrimitiveType('digitz');
const LongType = new PrimitiveType('longz');
const StringType = new PrimitiveType('string');
const ConstType = new PrimitiveType('stayz');
const BoolType = new PrimitiveType('boolz');
const NoneType = new PrimitiveType('none');


const standardFunctions = [
  new Func('supLilBitch', [new Param('s', StringType)]),
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

module.exports = { IntType, LongType, StringType, ConstType, BoolType, NoneType,  standardFunctions };