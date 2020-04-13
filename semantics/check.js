const util = require("util");

const ArrayType = require("../ast/array-type");
const DictType = require("../ast/dict-type");
const SetType = require("../ast/set-type");
const TupleType = require("../ast/tuple-type");
const IdExp = require("../ast/identifier-expression");
const FunctionDeclaration = require("../ast/function-declaration");
const IntType = require("../ast/int-type");
// const NoneType = require("../ast/none-type");
const BooleanType = require("../ast/boolean-type");
const LongType = require("../ast/long-type");
const StringType = require("../ast/string-type");
// not using nonetype so we didnt import it
// const { IntType, LongType, StringType, BoolType } = require("./builtins"); //standard functions?

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

  isString(expression) {
    doCheck(expression.type === StringType, "Not a string");
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
    console.log(`expression type ${util.inspect(expression)}`);
    doCheck(expression.type === IntType, "Not an integer");
  },

  isBoolean(expression) {
    doCheck(expression.type === BooleanType, "Not a boolean");
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

  isAssignableTo(exp, type) {
    console.log(`Is ${util.inspect(exp)} assignable to ${util.inspect(type)}`);
    doCheck(
      JSON.stringify(exp.type) == JSON.stringify(type) ||
        (exp.type === IntType && type == LongType),
      // (exp.constructor === NoneLiteral && type.constructor === IdType) ||
      // (exp.constructor === EmptyListLiteral && type.constructor === ListType) ||
      // (exp.constructor === EmptySetLiteral && type.constructor === SetType) ||
      // type.constructor === AnyType,
      "Type mismatch"
    );
  },

  // MOVE TO VAREXP
  //     check.isAssignableTo(
  //       this.source[index],
  //       id.constructor === SubscriptedExpression   a[e]
  //         ? variable.type.memberType
  //         : variable.type,
  //       id.constructor === MemberExpression
  //         ? variable.type.memberType
  //         : variable.type
  //     );

  // if (id.constructor === SubscriptedExpression) {
  //   let prim = new PrimitiveType(variable.type.type);
  //   check.isAssignableTo(this.source[index], prim);
  // } else if (id.constructor === MemberExpression) {
  //   let prim = new PrimitiveType(variable.type.type);
  //   check.isAssignableTo(this.source[index], prim);
  // } else {
  //   console.log("FUCKING MADE IT!");
  //   this.source[index].type = this.source[index].type.analyze(context);

  //   check.isAssignableTo(this.source[index], variable.type);
  // }

  sameType(t1, t2) {
    console.log(`Is ${util.inspect(t1)} and ${util.inspect(t2)}`);
    doCheck(
      JSON.stringify(t1.type) === JSON.stringify(t2.type),
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
