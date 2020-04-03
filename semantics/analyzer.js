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
// const ClassicForLoop = require("../ast/loop.Loop"); // not sure if this is right
const Closure = require("../ast/closure");
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
const Loop = require("../ast/loop");
const MemberExpression = require("../ast/member-expression");
const NoneLiteral = require("../ast/None");
const NumericLiteral = require("../ast/numeric-literal");
const NumType = require("../ast/numeric-type");
const Optional = require("../ast/optional-type");
const Parameter = require("../ast/parameter");
const PrimitiveType = require("../ast/primitive-type");
// const Print = require("../ast/print");
// const PrintStatement = require("../ast/print-statement");
const Program = require("../ast/program");
const ReturnStatement = require("../ast/return-statement");
const SetExpression = require("../ast/set-expression");
const SetType = require("../ast/set-type");
const SpreadForLoop = require("../ast/loop"); // not sure if this is right
const StringLiteral = require("../ast/string-literal");
const SubscriptedExpression = require("../ast/subscripted-expression");
const SwitchStatement = require("../ast/switch-statement");
const SimpleStmt_call = require("../ast/simple-statement-call");
const TupleType = require("../ast/tuple-type");
const TupleExpression = require("../ast/tuple-expression");
const UnaryExpression = require("../ast/unary-expression");
const VariableDeclaration = require("../ast/variable-declaration");
const WhileStatement = require("../ast/while-statement");


const {
  IntType,
  LongType,
  StringType,
  ConstType,
  BoolType
  // NoneType
} = require("./builtins");
const check = require("./check");
const Context = require("./context");

module.exports = function (exp) {
  exp.analyze(Context.INITIAL);
};

//  constructor(type, id, expression) {
Argument.prototype.analyze = function (context) {
  this.type = context.lookup(this.type);
  // check.isArrayType(this.type);
  //TODO: we aren't sure on this one
  // this.size.analyze(context);
  // check.isInteger(this.size);
  // this.fill.analyze(context);
  // check.isAssignableTo(this.fill, this.type.memberType);
};

ArrayExpression.prototype.analyze = function (context) {
  this.expression.analyze(context);
  check.isArray(this.expression);
};

ArrayType.prototype.analyze = function (context) {
  this.arr.analyze(context);
  check.isArrayType(this.arr);
  //got from goof?
  this.type = getType(this.type);
  // check.isArrayType(this.arr);
};

AssignmentStatement.prototype.analyze = function (context) {
  this.source.analyze(context);
  this.target.analyze(context);
  check.isAssignableTo(this.source, this.target.type);
  check.isNotConstant(this.target);
};

//update for booleans in video , and and or ops
BinaryExpression.prototype.analyze = function (context) {
  this.left.analyze(context);
  this.right.analyze(context);
  if (/[-+*/]/.test(this.op)) {
    check.isInteger(this.left);
    check.isInteger(this.right);
    this.type = IntType;
  } else if (/&& | \|\|/.test(this.op)) {
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
  this.statements.analyze(statements);
  this.statements.forEach(s => s.analyze(context));
  check.isStatement(this.statements);
};

BreakStatement.prototype.analyze = function (context) {
  check.inLoop(context, "GTFO💩");
};

//call statement?
Call.prototype.analyze = function (context) {
  this.id = context.lookup(this.id);
  check.isFunction(this.id, "Attempt to call a non-function");
  this.args.forEach(arg => arg.analyze(context));
  check.legalArguments(this.args, this.callee.params);
};

Case.prototype.analyze = function (context) {
  this.expression = context.lookup(this.expression);
  check.isBoolean(this.expression, "Expression for switch statement case");
  this.body = context.lookup(this.body);
  check.isBlock(this.body, "Case body contains a non-statement");
};

//update class with analyze signature! see function declaration
//use legal arguments check on all args and params
ClassDeclaration.prototype.analyze = function (context) {
  this.params.forEach(p => {
    p.analyze(this.bodyContext);
    check.fieldHasNotBeenUsed(this.p, usedFields);
    check.isParam(this.params);
    // this.p = context.addClass()
  });
  this.body = context.lookup(this.body);
  check.isBlock(this.body, "Class declaration does not contain block");
  context.addClass(this);
};

// ClassicForLoop.prototype.analyze = function (context) {
//   this.type = context.lookup(this.type);
//   this.initexpression.analyze(context); //analyze assigns a type
//   check.isAssignableTo(this.initexpression, this.type);
//   this.testExpression.analyze(context);
//   check.isBoolean(this.testExpression, "Condition in for");
//   variableToIncrement = context.lookup(updateid);
//   check.isIntegerOrLong(variableToIncrement, "Increment in for");
//   const bodyContext = context.createChildContextForLoop();
//   this.index = new Variable(this.initId, this.initexpression.type);
//   this.index.constant = true;
//   bodyContext.add(this.index);
//   this.body.analyze(bodyContext);
// };

//TODO: ???
Closure.prototype.analyze = function (context) {};

ContinueStatement.prototype.analyze = function (context) {
  check.inLoop(context, "keepItPushin");
};

DefaultCase.prototype.analyze = function (context) {
  this.body = context.lookup(this.body);
  check.isBlock(this.body, "Default case body contains a non-statement");
};

DictExpression.prototype.analyze = function (context) {
  this.expression.analyze(context);
  check.isDictionary(this.expression);
};

DictType.prototype.analyze = function (context) {
  this.dictz.analyze(context);
  check.isDictType(this.dictz);
  this.valuetype = getType(this.v);
  this.keytype.forEach(k => {
    k.analyze(context);
    check.isPrimitiveType(this.k);
  });
  this.valuetype.forEach(v => {
    v.analyze(context);
    check.isValidType(this.v);
  });
};

Exponent.prototype.analyze = function (context) {
  this.lettere.analyze(context);
  check.isE(this.lettere);
  this.sign.analyze(context);
  check.isValidSign(this.sign);
  this.digit.analyze(context);
  check.isIntegerOrLong(this.digit);
};

Fraction.prototype.analyze = function (context) {
  this.digit.analyze(context);
  check.isIntegerOrLong(this.digit);
};

// Function analysis is broken up into two parts in order to support (nutual)
// recursion. First we have to do semantic analysis just on the signature
// (including the return type). This is so other functions that may be declared
// before this one have calls to this one checked.
FunctionDeclaration.prototype.analyzeSignature = function (context) {
  this.body = context.createChildContextForFunctionBody();
  this.params.forEach(p => p.analyze(this.body));
  this.type = !this.type ? undefined : context.lookup(this.type);
};

FunctionDeclaration.prototype.analyze = function () {
  this.body.analyze(this.body);
  check.isAssignableTo(
    this.body,
    this.type,
    "Type mismatch in function return"
  );
  delete this.body; // This was only temporary, delete to keep output clean.
};

//id type vs id expression vs id declaration???
IdType.prototype.analyze = function (context) {
  this.id.analyze(this.id);
  check.isValidType(this.id);
};

//might not need this one
IdentifierDeclaration.prototype.analyze = function (context) {
  this.id.analyze(this.id);
  check.isValidType(this.id);
};

IdentifierExpression.prototype.analyze = function (context) {
  this.id.analyze(this.id);
  check.isValidType(this.id);
};

//not sure about this one either
IfStatement.prototype.analyze = function (context) {
  this.cases.analyze(context);
  this.cases.forEach(c => {
    c.analyze(context);
    check.isBoolean(this.c, "If statement is not a boolean");
    if (this.alternate) {
      this.alternate.analyze(context);
      if (this.c.type) {
        check.expressionsHaveTheSameType(this.c, this.alternate);
      } else {
        check.mustNotHaveAType(this.alternate);
      }
    }
  });
  this.type = this.cases.type;
};

KeyValueExpression.prototype.analyze = function (context) {
  this.key.analyze(context);
  check.isExpression(this.key, "Key is not an expression");
  this.value.analyze(context);
  check.isExpression(this.value, "Value is not an expression");
};

// tiger has a Literal rule in its grammar which creates a Literal class in the ast
// we don't have that so we have to figure out how to do this properly
//previously Literal
PrimitiveType.prototype.analyze = function () {
  if (typeof this.value === "number") {
    this.type = IntType;
    this.type = LongType;
  } else if (typeof this.value === "string") {
    this.type = StringType;
  } else if (typeof this.value === "boolean") {
    this.type = BooleanType;
  } else {
    this.type = ConstType;
  }
};

MemberExpression.prototype.analyze = function (context) {
  this.varexp = context.lookup(this.varexp);
  //in variable declaration, add and in here check that it exists in the thing it was added in?
  check.isAlreadyDeclared(this.varexp, "varexp has not been declared");
  this.member = context.lookup(this.member);
  //check for if it is a valid member
  this.member.analyze(context);
};

Optional.prototype.analyze = function (context) {
  //TODO
};

// Is this right for ours??
Parameter.prototype.analyze = function (context) {
  //TODO, following is from tiger
  this.type = context.lookup(this.type);
  context.addVar(this);
};

Program.prototype.analyze = function (context) {
  //TODO
};

ReturnStatement.prototype.analyze = function (context) {
  //TODO
};

SetExpression.prototype.analyze = function (context) {
  //TODO, following is from tiger
  this.type = context.lookup(this.type);
  check.isRecordType(this.type);
  this.bindings.forEach(binding => {
    const field = this.type.getFieldForId(binding.id);
    binding.analyze(context);
    check.isAssignableTo(binding.value, field.type);
  });
};

SetType.prototype.analyze = function (context) {
  //TODO, following is from tiger
  const usedFields = new Set();
  this.fields.forEach(field => {
    check.fieldHasNotBeenUsed(field.id, usedFields);
    usedFields.addVar(field.id);
    field.analyze(context);
  });
};

//this is from tiger
SetType.prototype.getFieldForId = function (id) {
  const field = this.fields.find(f => f.id === id);
  if (!field) {
    throw new Error("No such field");
  }
  return field;
};

SimpleStmt_call.prototype.analyze = function (context) {
  //TODO
};

// SpreadForLoop.prototype.analyze = function (context) {
//   this.min = context.lookup(this.min);
//   this.min.analyze(context);
//   check.isIntegerOrLong(this.min, "Min in for loop is not a number");
//   this.max = context.lookup(this.max);
//   this.max.analyze(context);
//   check.isIntegerOrLong(this.max, "Max in for loop is not a number");

//   //do we need this?
//   const bodyContext = context.createChildContextForLoop();
//   bodyContext.add(this.block);
//   this.block.analyze(bodyContext);
// };

SwitchStatement.prototype.analyze = function (context) {
  //TODO
};

SubscriptedExpression.prototype.analyze = function (context) {
  //TODO, following is from tiger
  this.array.analyze(context);
  check.isArray(this.array);
  this.subscript.analyze(context);
  check.isInteger(this.subscript);
  this.type = this.array.type.memberType;
};

TupleType.prototype.analyze = function (context) {
  //TODO
};

TupleExpression.prototype.analyze = function (context) {
  //TODO
};

UnaryExpression.prototype.analyze = function (context) {
  //TODO
};

//constant, id, type, expression
VariableDeclaration.prototype.analyze = function (context) {
  //how to we update add method??
  // this.vardec = context.addVar(this.type, this.id);
  //TODO: the rest, this is from tigers "Variable"
  this.init.analyze(context);
  if (this.type) {
    this.type = context.lookup(this.type);
    check.isAssignableTo(this.init, this.type);
  } else {
    // Yay! type inference!
    this.type = this.init.type;
  }
  context.addVar(this);
};

//TODO: this is the tiger one
WhileStatement.prototype.analyze = function (context) {
  this.expression.analyze(context);
  check.isBoolean(this.expression, "Condition in while");
  this.body.analyze(context.createChildContextForLoop());
};
