const util = require("util");

const ArrayType = require("../ast/array-type");
const DictType = require("../ast/dict-type");
const SetType = require("../ast/set-type");
const TupleType = require("../ast/tuple-type");
const IdExp = require("../ast/identifier-expression");
const FunctionDeclaration = require("../ast/function-declaration");

// not using nonetype so we didnt import it
const { IntType, LongType, StringType, BoolType } = require("./builtins"); //standard functions?

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = {
  isArrayType(type) {
    doCheck(type.constructor === ArrayType, "Not an array type");
  },

  isDictType(type) {
    doCheck(type.constructor === DictType, "Not a dictionary type");
  },

  isTupleType(type) {
    doCheck(type.constructor === TupleType, "Not a tuple type");
  },

  isSetType(type) {
    doCheck(type.constructor === SetType, "Not a set type");
  },

  // Is the type of this expression an array type?
  isArray(expression) {
    doCheck(expression.type.constructor === ArrayType, "Not an array");
  },

  isDictionary(expression) {
    doCheck(expression.type.constructor === DictType, "Not a dictionary");
  },

  isTuple(expression) {
    doCheck(expression.type.constructor === TupleType, "Not a tuple");
  },

  isSet(expression) {
    doCheck(expression.type.constructor === SetType, "Not a set");
  },

  isInteger(expression) {
    doCheck(expression.type === IntType, "Not an integer");
  },

  isBoolean(expression) {
    doCheck(expression.type === BoolType, "Not a boolean");
  },

  mustNotHaveAType(expression) {
    doCheck(!expression.type, "Expression must not have a type");
  },

  isIntegerOrString(expression) {
    doCheck(
      expression.type === IntType || expression.type === StringType,
      "Not an integer or string"
    );
  },

  isIntegerOrLong(expression) {
    doCheck(
      expression.type === IntType || expression.type === LongType,
      "Not an integer or long"
    );
  },

  isFunction(value) {
    doCheck(value.constructor === FunctionDeclaration, "Not a function");
  },

  inFunction(context) {
    doCheck(context.inFunction, "Not inside a function");
  },

  // ALL CREDIT FOR SAME TYPE AND ASSIGNABLE TO CASPER AND SCRIPTOFINO
  isAssignableTo(exp, type) {
    // console.log("HI");
    // console.log(JSON.stringify(exp.type.type));
    // console.log("hi");
    // console.log(JSON.stringify(type));
    doCheck(
      JSON.stringify(exp.type.type) === JSON.stringify(type),
      "Types are not compatible"
    );
  },

  sameType(t1, t2) {
    doCheck(
      JSON.stringify(t1) === JSON.stringify(t2),
      "Types are not compatible"
    );
  },

  isNotConstant(lvalue) {
    doCheck(
      !(lvalue.constructor === IdExp && lvalue.ref.constant),
      "Assignment to constant variable"
    );
  },

  fieldHasNotBeenUsed(field, usedFields) {
    doCheck(!usedFields.has(field), `Field ${field} already declared`);
  },

  inLoop(context, keyword) {
    doCheck(context.inLoop, `${keyword} can only be used in a loop`);
  },

  asyncAwait(calleeIsAsync, callIsWait) {
    doCheck(
      calleeIsAsync === callIsWait,
      "Can only call async functions with await"
    );
  },

  // Same number of args and params; all types compatible
  // TODO
  legalArguments(args, params) {
    doCheck(
      args.length === params.length,
      `Expected ${params.length} args in call, got ${args.length}`
    );
    args.forEach(
      (arg, i) =>
        arg.id === params[i].id && this.isAssignableTo(arg, params[i].type)
    );
  },

  sameNumberOfInitializersAsVariables(expressions, ids) {
    doCheck(expressions.length === ids.length, "Incorrect number of arguments");
  },
};
