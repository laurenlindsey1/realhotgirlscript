const Argument = require("../ast/argument");
const ArrayExpression = require("../ast/array-expression");
const ArrayType = require("../ast/array-type");
const AssignmentStatement = require("../ast/assignment-statement");
const Block = require("../ast/block");
const BooleanLiteral = require("../ast/boolean-literal");
const BinaryExpression = require("../ast/binary-expression");
const BreakStatement = require("../ast/break-statement");
const Call = require("../ast/call");
const Case = require("../ast/case");
const ClassDeclaration = require("../ast/class-declaration");
const { ClassicForLoop, SpreadForLoop } = require("../ast/loop");
const ContinueStatement = require("../ast/continue-statement");
const DefaultCase = require("../ast/default-case");
const DictExpression = require("../ast/dict-expression");
const DictType = require("../ast/dict-type");
const Exponent = require("../ast/exponent");
const Fraction = require("../ast/fraction");
const FunctionDeclaration = require("../ast/function-declaration");
const IdentifierDeclaration = require("../ast/identifier-declaration");
const IdentifierExpression = require("../ast/identifier-expression");
const IdType = require("../ast/id-type");
const IfStatement = require("../ast/if-statement");
const KeyValueExpression = require("../ast/keyvalue-expression");
const MemberExpression = require("../ast/member-expression");
const NoneLiteral = require("../ast/None");
const NumericLiteral = require("../ast/numeric-literal");
const Parameter = require("../ast/parameter");
const PrimitiveType = require("../ast/primitive-type");
const PrintStatement = require("../ast/print-statement");
const Program = require("../ast/program");
const ReturnStatement = require("../ast/return-statement");
const SetExpression = require("../ast/set-expression");
const SetType = require("../ast/set-type");
const StringLiteral = require("../ast/string-literal");
const SubscriptedExpression = require("../ast/subscripted-expression");
const SwitchStatement = require("../ast/switch-statement");
const CallStatement = require("../ast/call-statement");
const TupleType = require("../ast/tuple-type");
const TupleExpression = require("../ast/tuple-expression");
const UnaryExpression = require("../ast/unary-expression");
const VariableDeclaration = require("../ast/variable-declaration");
const WhileStatement = require("../ast/while-statement");

const {
  IntType,
  LongType,
  StringType,
  BoolType,
  NoneType,
} = require("./builtins");
const check = require("./check");
const Context = require("./context");

module.exports = function (program) {
  program.analyze(Context.INITIAL);
};

StringLiteral.prototype.analyze = function () {
  this.type = StringType;
};

NoneLiteral.prototype.analyze = function () {
  this.type = NoneType;
};

BooleanLiteral.prototype.analyze = function () {
  this.type = BoolType;
};

NumericLiteral.prototype.analyze = function () {
  this.type = IntType;
};

Argument.prototype.analyze = function (context) {
  this.expression.analyze(context);
};

ArrayExpression.prototype.analyze = function (context) {
  this.expression.forEach((m) => m.analyze(context));
  if (this.expression.length) {
    this.type = new ArrayType(this.expression[0].arrayz);
    for (let i = 1; i < this.expression.length; i += 1) {
      check.sameType(this.expression[i].arrayz, this.type.type);
    }
  }
};

ArrayType.prototype.analyze = function (context) {
  this.memberType = this.memberType.analyze(context);
};

AssignmentStatement.prototype.analyze = function (context) {
  this.source.analyze(context);
  this.target.analyze(context);
  check.isAssignableTo(this.source, this.target.type);
  check.isNotConstant(this.target);
};

//CHECK AGAINST OHM EDITOR
BinaryExpression.prototype.analyze = function (context) {
  this.left.analyze(context);
  this.right.analyze(context);
  if (/[^-+*/]/.test(this.op)) {
    check.isInteger(this.left);
    check.isInteger(this.right);
    this.type = IntType;
  } else if (/&&|\|\|/.test(this.op)) {
    // not sure if this is how you do && or ||
    check.isBoolean(this.left);
    check.isBoolean(this.right);
    this.type = BoolType;
  } else if (/<=?|>=?/.test(this.op)) {
    check.expressionsHaveTheSameType(this.left, this.right);
    check.isIntegerOrString(this.left);
    check.isIntegerOrString(this.right);
    this.type = BoolType;
  } else {
    check.expressionsHaveTheSameType(this.left, this.right);
    this.type = BoolType;
  }
};

Block.prototype.analyze = function (context) {
  this.statements.forEach((stmt) => {
    stmt.analyze(context);
  });
};

BreakStatement.prototype.analyze = function (context) {
  check.inLoop(context, "GTFO💩");
};

Call.prototype.analyze = function (context) {
  this.id = context.lookupVar(this.id);
  check.isFunction(this.id, "Attempt to call a non-function");
  this.args.forEach((arg) => arg.analyze(context));
  check.legalArguments(this.args, this.id.params);
  check.asyncAwait(this.id.async, this.wait);
  this.type = this.id.type;
};

Case.prototype.analyze = function (context) {
  this.expression.analyze(context);
  check.isBoolean(this.expression, "Expression for switch statement case");
  this.body.forEach((b) => {
    b.analyze(context);
  });
};

//update class with analyze signature! see function declaration
//use legal arguments check on all args and params
// Syntax: class id "(" Params ")" Block
// AST: id, params, body
ClassDeclaration.prototype.analyze = function (context) {
  context.addClass(this.id, this);
  this.bodyContext = context.createChildContextForFunctionBody();
  this.params.forEach((p) => {
    p.analyze(this.bodyContext);
  });
  this.body.analyze(context);
};

ClassicForLoop.prototype.analyze = function (context) {
  this.type.analyze(context);
  this.initexpression.analyze(context); //analyze assigns a type
  check.isAssignableTo(this.initexpression, this.type);
  this.testExpression.analyze(context);
  check.isBoolean(this.testExpression, "Condition in for");
  const variableToIncrement = context.lookupVar(this.updateid);
  check.isIntegerOrLong(variableToIncrement, "Increment in for");
  const bodyContext = context.createChildContextForLoop();
  this.index = new VariableDeclaration(
    true,
    this.initexpression.type,
    [this.initId],
    [this.initexpression]
  );
  bodyContext.add(this.index);
  this.body.analyze(bodyContext);
};

ContinueStatement.prototype.analyze = function (context) {
  check.inLoop(context, "keepItPushin");
};

DefaultCase.prototype.analyze = function (context) {
  this.body.forEach((b) => {
    b.analyze(context);
  });
};

DictExpression.prototype.analyze = function (context) {
  this.expression.analyze(context);
  check.isDictionary(this.expression);
};

DictType.prototype.analyze = function (context) {
  this.keyType = this.keyType.analyze(context);
  this.valueType = this.valueType.analyze(context);
};

//not sure if we need this or not, if tests work without it, remove later
Exponent.prototype.analyze = function (context) {
  this.digit.analyze(context);
  check.isIntegerOrLong(this.digit);
};

Fraction.prototype.analyze = function (context) {
  this.digit.analyze(context);
  check.isIntegerOrLong(this.digit);
};

// Function analysis is broken up into two parts in order to support (mutual)
// recursion. First we have to do semantic analysis just on the signature
// (including the return type). This is so other functions that may be declared
// before this one have calls to this one checked.
FunctionDeclaration.prototype.analyzeSignature = function (context) {
  this.type = this.type.analyze(context);
  this.bodyContext = context.createChildContextForFunctionBody();
  this.params.forEach((p) => p.analyze(this.bodyContext));
};

FunctionDeclaration.prototype.analyze = function () {
  this.body.analyze(this.bodyContext);
};

IdType.prototype.analyze = function (context) {
  this.type = context.lookupClass(this.type);
};

//might not need this one
IdentifierDeclaration.prototype.analyze = function (context) {
  this.id.analyze(this.id);
  check.isValidType(this.id, context);
};

IdentifierExpression.prototype.analyze = function (context) {
  this.id.analyze(this.id);
  check.isValidType(this.id, context);
};

IfStatement.prototype.analyze = function (context) {
  this.tests.forEach((test) => {
    test.analyze(context);
    check.isBoolean(test);
  });
  this.consequents.forEach((block) => {
    const blockContext = context.createChildContextForBlock();
    block.forEach((statement) => statement.analyze(blockContext));
  });
  if (this.alternate) {
    const alternateBlock = context.createChildContextForBlock();
    this.alternate.forEach((s) => s.analyze(alternateBlock));
  }
};

KeyValueExpression.prototype.analyze = function (context) {
  this.key.analyze(context);
  check.isExpression(this.key, "Key is not an expression");
  this.value.analyze(context);
  check.isExpression(this.value, "Value is not an expression");
};

PrimitiveType.prototype.analyze = function () {
  if (typeof this.value === "number") {
    this.type = IntType;
    this.type = LongType;
  } else if (typeof this.value === "string") {
    this.type = StringType;
  } else if (typeof this.value === "boolean") {
    this.type = BoolType;
  } else {
    this.type = NoneType;
  }
};

PrintStatement.prototype.analyze = function (context) {
  this.expression.analyze(context);
};

MemberExpression.prototype.analyze = function (context) {
  this.varexp.analyze(context);
  this.varexp = context.lookupVar(this.varexp);
  this.member = context.lookupVar(this.member);
  this.member.analyze(context);
};

Parameter.prototype.analyze = function (context) {
  this.type = this.type.analyze(context);
  if (this.expression) {
    this.expression.analyze(context);
  }
  context.addVar(this.id, this);
};

Program.prototype.analyze = function (context) {
  this.statements.forEach((stmt) => {
    stmt.analyze(context);
  });
};

ReturnStatement.prototype.analyze = function (context) {
  this.expression.analyze(context);
  check.inFunction(context, "Return statement not in function");
  check.isAssignableTo(this.expression, context.currentFunction.type);
};

SetExpression.prototype.analyze = function (context) {
  this.expression.forEach((m) => m.analyze(context));
  if (this.expression.length) {
    this.type = new SetType(this.expression[0].setz);
    for (let i = 1; i < this.expression.length; i += 1) {
      check.sameType(this.expression[i].setz, this.type.type);
    }
  }
};

SetType.prototype.analyze = function (context) {
  this.memberType = this.memberType.analyze(context);
};

CallStatement.prototype.analyze = function (context) {
  this.call.analyze(context);
  // Since this is called from a statement, the function probably should
  // not have a return type, but it's ok bc Java and C throw it away too
};

SpreadForLoop.prototype.analyze = function (context) {
  this.min.analyze(context);
  check.isIntegerOrLong(this.min, "Min in for loop is not a number");
  this.max.analyze(context);
  check.isIntegerOrLong(this.max, "Max in for loop is not a number");

  const bodyContext = context.createChildContextForLoop();
  this.body.analyze(bodyContext);
};

//expression, cases alternate
SwitchStatement.prototype.analyze = function (context) {
  this.expression.analyze(context);

  //TODO: this is from the if statement
  this.consequents.forEach((block) => {
    const blockContext = context.createChildContextForBlock();
    block.forEach((statement) => statement.analyze(blockContext));
  });
  if (this.alternate) {
    const alternateBlock = context.createChildContextForBlock();
    this.alternate.forEach((s) => s.analyze(alternateBlock));
  }
};

SubscriptedExpression.prototype.analyze = function (context) {
  this.varexp.analyze(context);
  this.varexp = context.lookupVar(this.varexp);
  this.subscript = context.lookupVar(this.subscript);
  this.subscript.analyze(context);
};

TupleType.prototype.analyze = function (context) {
  this.memberTypes = this.memberTypes.map((t) => t.analyze(context));
};

TupleExpression.prototype.analyze = function (context) {
  //TODO how do we ensure that the types inputted are the right types declared in the expression?
};

// a little weird...
UnaryExpression.prototype.analyze = function (context) {
  this.operand.analyze(context);
  if (["BANGENERGY"].includes(this.op)) {
    check.isBoolean(this.operand);
    this.type = BoolType;
  } else if (["-", "+"].includes(this.op)) {
    try {
      check.isInteger(this.operand);
      this.type = IntType;
    } catch (e) {
      try {
        check.isLong(this.operand);
        this.type = LongType;
      } catch (e) {
        throw new Error("Not a IntType");
      }
    }
  }
};

// Syntax: const? Type DeclIds ":" Exps
// Example: const longz a, b, c : 1, 2, 3
// AST Node: constant, type, ids, expressions
VariableDeclaration.prototype.analyze = function (context) {
  this.type = this.type.analyze(context);
  this.expressions.forEach((e) => check.isAssignableTo(e, this.type));
  check.sameNumberOfInitializersAsVariables(this.expressions, this.ids);
  this.ids.forEach((id) => context.addVar(id, this));
};

WhileStatement.prototype.analyze = function (context) {
  this.expression.analyze(context);
  check.isBoolean(this.expression, "Condition in while");
  const bodyContext = context.createChildContextForLoop();
  this.body.analyze(bodyContext);
};
