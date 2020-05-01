const ArrayType = require('../ast/array-type');
const DictType = require('../ast/dict-type');
const SetType = require('../ast/set-type');
const TupleType = require('../ast/tuple-type');
const IdExp = require('../ast/identifier-expression');
const FunctionDeclaration = require('../ast/function-declaration');
const ClassDeclaration = require('../ast/class-declaration');
const IntType = require('../ast/int-type');
const NoneLiteral = require('../ast/none-literal');
const IdType = require('../ast/id-type');
const BooleanType = require('../ast/boolean-type');
const LongType = require('../ast/long-type');
const StringType = require('../ast/string-type');
const ReturnStatement = require('../ast/return-statement');
const KeyValueExpression = require('../ast/keyvalue-expression');

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isEmptyDictOrSet(expression) {
  if (expression.type.constructor === DictType || expression.type.constructor === SetType) {
    return expression.expressions.length === 0;
  }
  return false;
}

function isEmptyTuple(expression) {
  if (expression.type.constructor === TupleType) {
    return expression.expressions.length === 0;
  }
  return false;
}

function isEmptyArray(expressions) {
  if (expressions.type.constructor === ArrayType) {
    return expressions.expressions.length === 0;
  }
  return false;
}

module.exports = {
  isKeyValueExpression(expression) {
    doCheck(expression.constructor === KeyValueExpression, 'Not a dictionary type');
  },

  isString(expression) {
    doCheck(expression.type === StringType, 'Not a string');
  },

  isInteger(expression) {
    doCheck(expression.type === IntType, 'Not an integer');
  },

  isBoolean(expression) {
    doCheck(expression.type === BooleanType, 'Not a boolean');
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

  isFunctionOrClass(value) {
    doCheck(
      value.constructor === FunctionDeclaration || value.constructor === ClassDeclaration,
      'Not callable'
    );
    if (value.constructor === FunctionDeclaration) {
      return value.type;
    } else {
      return new IdType(value.id);
    }
  },

  inFunction(context) {
    doCheck(context.currentFunction, 'Not inside a function');
  },

  isNotSubscriptable(expression) {
    doCheck(
      expression.type !== IntType &&
      expression.type !== LongType &&
      expression.type !== BooleanType,
      'Not subscriptable'
    );
  },

  breakMustAppearInLoopOrSwitch(context) {
    doCheck(context.inLoop || context.inSwitch, 'Break outside of loop or switch');
  },

  hasMemberExpression(expression) {
    doCheck(
      expression.type !== IntType &&
      expression.type !== LongType &&
      expression.type !== BooleanType &&
      expression.type !== StringType,
      `Has no member expression`
    );
  },

  isAssignableTo(exp, type, errorMessage = 'Type mismatch') {
    doCheck(
      JSON.stringify(exp.type) == JSON.stringify(type) ||
      (exp.type === IntType && type == LongType) ||
      (exp.constructor === NoneLiteral && type.constructor === IdType) ||
      isEmptyDictOrSet(exp) ||
      isEmptyTuple(exp) ||
      isEmptyArray(exp),
      errorMessage
    );
  },

  sameType(t1, t2) {
    doCheck(JSON.stringify(t1.type) === JSON.stringify(t2.type), 'Type mismatch');
  },

  isNotConstant(lvalue) {
    doCheck(
      !(lvalue.constructor === IdExp && lvalue.ref.constant),
      'Assignment to constant variable'
    );
  },

  inLoop(context, keyword) {
    doCheck(context.inLoop, `${keyword} can only be used in a loop`);
  },

  asyncAwait(calleeIsAsync, callIsWait) {
    doCheck(!!calleeIsAsync === !!callIsWait, 'Can only call async functions with await');
  },

  legalArguments(args, params) {
    doCheck(
      args.length === params.length,
      `Expected ${params.length} args in call, got ${args.length}`
    );
    args.forEach(
      (arg, i) => arg.id === params[i].id && this.isAssignableTo(arg.expression, params[i].type)
    );
  },

  sameNumberOfInitializersAsVariables(expressions, ids) {
    doCheck(expressions.length === ids.length, 'Incorrect number of arguments');
  },
};
