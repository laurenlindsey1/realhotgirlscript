const {
  Argument,
  ArrayExpression,
  ArrayType,
  AssignmentStatement,
  BinaryExpression,
  Block,
  BooleanLiteral,
  BooleanType,
  BreakStatement,
  Call,
  Case,
  ClassDeclaration,
  Closure,
  ContinueStatement,
  DefaultCase,
  DictExpression,
  DictType,
  Exponent,
  Fraction,
  FunctionDeclaration,
  IfStatement,
  IdentifierDeclaration,
  IdentifierExpression,
  IdType,
  KeyValueExpression,
  Loop,
  LongType,
  MemberExpression,
  NumericLiteral,
  NumType,
  Optional,
  Parameter,
  Print,
  PrintStatement,
  Program,
  ReturnStatement,
  SetExpression,
  SetType,
  StringLiteral,
  SubscriptedExpression,
  SwitchStatement,
  SimpleStmt_call,
  TupleType,
  TupleExpression,
  UnaryExpression,
  VariableDeclaration,
  WhileStatement
} = require("../ast");
const {
  IntType,
  LongType,
  StringType,
  ConstType,
  BoolType,
  NoneType
} = require("./builtins"); //standard functions?
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
  if (/[-+*/&|]/.test(this.op)) {
    check.isInteger(this.left);
    check.isInteger(this.right);
  } else if (/<=?|>=?/.test(this.op)) {
    check.expressionsHaveTheSameType(this.left, this.right);
    check.isIntegerOrString(this.left);
    check.isIntegerOrString(this.right);
  } else {
    check.expressionsHaveTheSameType(this.left, this.right);
  }
  this.type = IntType;
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
  this.id = context.add(this);
  this.params.forEach(p => {
    p.analyze(this.bodyContext);
    check.fieldHasNotBeenUsed(this.p, usedFields);
    check.isParam(this.params);
    // this.p = context.add()
  });
  this.body = context.lookup(this.body);
  check.isBlock(this.body, "Class declaration does not contain block");
};

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

//previously Literal
PrimitiveType.prototype.analyze = function () {
  if (typeof this.value === "digitz") {
    this.type = IntType;
  } else if (typeof this.value === "wordz") {
    this.type = StringType;
  } else if (typeof this.value === "longz") {
    this.type = LongType;
  } else if (typeof this.value === "stayz") {
    this.type = ConstType;
  } else {
    this.type = BooleanType;
  }
};

ClassicForLoop.prototype.analyze = function (context) {
  this.type = context.lookup(this.type);
  this.initexpression.analyze(context); //analyze assigns a type
  check.isAssignableTo(this.initexpression, this.type);
  this.testExpression.analyze(context);
  check.isBoolean(this.testExpression, "Condition in for");
  variableToIncrement = context.lookup(updateid);
  check.isIntegerOrLong(variableToIncrement, "Increment in for");
  const bodyContext = context.createChildContextForLoop();
  this.index = new Variable(this.initId, this.initexpression.type);
  this.index.constant = true;
  bodyContext.add(this.index);
  this.body.analyze(bodyContext);
};

SpreadForLoop.prototype.analyze = function (context) {
  this.min = context.lookup(this.min);
  this.min.analyze(context);
  check.isIntegerOrLong(this.min, "Min in for loop is not a number");
  this.max = context.lookup(this.max);
  this.max.analyze(context);
  check.isIntegerOrLong(this.max, "Max in for loop is not a number");

  //do we need this?
  const bodyContext = context.createChildContextForLoop();
  bodyContext.add(this.block);
  this.block.analyze(bodyContext);
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

Parameter.prototype.analyze = function (context) {
  //TODO, following is from tiger
  this.type = context.lookup(this.type);
  context.add(this);
};

Print.prototype.analyze = function (context) {
  //TODO
};

PrintStatement.prototype.analyze = function (context) {
  //TODO
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
    usedFields.add(field.id);
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

SwitchStatement.prototype.analyze = function (context) {
  //TODO
};

SimpleStmt_call.prototype.analyze = function (context) {
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
  this.vardec = context.add(this.type, this.id);
  //TODO: the rest, this is from tigers "Variable"
  this.init.analyze(context);
  if (this.type) {
    this.type = context.lookup(this.type);
    check.isAssignableTo(this.init, this.type);
  } else {
    // Yay! type inference!
    this.type = this.init.type;
  }
  context.add(this);
};

//TODO: this is the tiger one
WhileStatement.prototype.analyze = function (context) {
  this.expression.analyze(context);
  check.isBoolean(this.expression, "Condition in while");
  this.body.analyze(context.createChildContextForLoop());
};