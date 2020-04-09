const util = require('util');

// const { ArrayType, Func, RecordType, IdExp } = require('../ast');
const ArrayType = require('../ast/array-type');
const DictType = require('../ast/dict-type');
const SetType = require('../ast/set-type');
const TupleType = require('../ast/tuple-type');
const IdExp = require('../ast/identifier-expression');

const { IntType, LongType, StringType, BoolType, NoneType } = require('./builtins'); //standard functions?

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// add isDictType, isLongzType, etc.
module.exports = {
  // Is this type an array type?
  isArrayType(type) {
    //array type = primitives + objects
    doCheck(type.constructor === ArrayType, 'Not an array type');
  },

  isDictType(type) {
    doCheck(type.constructor === DictType, 'Not a dictionary type');
  },

  isTupleType(type) {
    doCheck(type.constructor === TupleType, 'Not a tuple type');
  },

  isSetType(type) {
    doCheck(type.constructor === SetType, 'Not a record type');
  },

  // Is the type of this expression an array type?
  isArray(expression) {
    doCheck(expression.type.constructor === ArrayType, 'Not an array');
  },

  isDictionary(expression) {
    //check for the right key/value pair
    doCheck(expression.type.constructor === DictType, 'Not a dictionary');
  },

  isE(lettere) {
    doCheck(lettere === 'e' || lettere === 'E', 'Not an E');
  },

  isValidSign(sign) {
    doCheck(sign === '+' || sign === '-' || sign === '', 'Not a valid sign');
  },

  // figure out
  isValidType(expression, context) {
    //primitives, objects, etc., anything
    doCheck(expression.type in context.typeDeclarations, 'Not a valid type');
  },

  isInteger(expression) {
    doCheck(expression.type === IntType, 'Not an integer');
  },

  isBoolean(expression) {
    doCheck(expression.type === BoolType, 'Not a boolean');
  },

  mustNotHaveAType(expression) {
    doCheck(!expression.type, 'Expression must not have a type');
  },

  isIntegerOrString(expression) {
    doCheck(
      expression.type === IntType || expression.type === StringType,
      'Not an integer or string'
    );
  },

  isIntegerOrLong(expression) {
    doCheck(expression.type === IntType || expression.type === LongType, 'Not an integer or long');
  },

  isStatement(statement) {
    //TODO
  },

  isBlock(body) {
    //TODO
  },

  isFunction(value) {
    doCheck(value.constructor === Func, 'Not a function');
  },

  inFunction(context) {
    doCheck(context.inFunction, 'Not inside a function');
  },

  // Are two types exactly the same?
  expressionsHaveTheSameType(e1, e2) {
    doCheck(e1.type === e2.type, 'Types must match exactly');
  },

  // Can we assign expression to a variable/param/field of type type?
  isAssignableTo(expression, type) {
    doCheck(
      expression.type === type || (expression.type === IntType && type == LongType),
      `Expression of type ${util.format(expression.type)} not compatible with type ${util.format(
        type
      )}`
    );
  },

  // const x = 3
  // x = 5
  isNotConstant(lvalue) {
    doCheck(
      !(lvalue.constructor === IdExp && lvalue.ref.constant),
      'Assignment to constant variable'
    );
  },

  fieldHasNotBeenUsed(field, usedFields) {
    doCheck(!usedFields.has(field), `Field ${field} already declared`);
  },

  inLoop(context, keyword) {
    doCheck(context.inLoop, `${keyword} can only be used in a loop`);
  },

  // Same number of args and params; all types compatible
  legalArguments(args, params) {
    doCheck(
      args.length === params.length,
      `Expected ${params.length} args in call, got ${args.length}`
    );
    args.forEach((arg, i) => this.isAssignableTo(arg, params[i].type));
  },
};
