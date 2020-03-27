const { Func, Param, PrimitiveType } = require('../ast');

const IntType = new PrimitiveType('int');
const StringType = new PrimitiveType('string');
const NilType = new PrimitiveType('nil');
//TODO: boolz, floatz, longz, etc.

const standardFunctions = [
  new Func('print', [new Param('s', StringType)]),
  new Func('size', [new Param('s', StringType)], IntType),
  new Func(
    'substring',
    [new Param('s', StringType), new Param('first', IntType), new Param('n', IntType)],
    StringType
  ),
  new Func('concat', [new Param('s', StringType), new Param('t', StringType)], StringType),
  new Func('not', [new Param('x', IntType)], IntType),
  new Func('exit', [new Param('code', IntType)]),
];

/* eslint-disable no-param-reassign */
standardFunctions.forEach(f => {
  f.builtin = true;
});
/* eslint-enable no-param-reassign */

//TODO: finish these
module.exports = { IntType, StringType, NilType, standardFunctions };