const util = require("util");
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
const NoneLiteral = require("../ast/none-literal");
const NumericLiteral = require("../ast/numeric-literal");
const Parameter = require("../ast/parameter");
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
const Variable = require("../ast/variable");
const WhileStatement = require("../ast/while-statement");

const IntType = require("../ast/int-type");
const NoneType = require("../ast/none-type");
const BooleanType = require("../ast/boolean-type");
const LongType = require("../ast/long-type");
const StringType = require("../ast/string-type");

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
  this.type = BooleanType;
};

NumericLiteral.prototype.analyze = function () {
  this.type = IntType;
};

Argument.prototype.analyze = function (context) {
  this.expression.analyze(context);
  context.addVar(id, this);
};

ArrayExpression.prototype.analyze = function (context) {
  this.expression.forEach((m) => m.analyze(context));
  if (this.expression.length) {
    this.type = new ArrayType(this.expression[0].type);
    for (let i = 1; i < this.expression.length; i += 1) {
      check.sameType(this.expression[i].type, this.type.type);
    }
  } else {
    this.type = new ArrayType(NoneType);
  }
};

ArrayType.prototype.analyze = function (context) {
  this.memberType = this.memberType.analyze(context);
};

AssignmentStatement.prototype.analyze = function (context) {
  this.source.forEach((s) => s.analyze(context));
  this.target.forEach((id) => id.analyze(context));
  if (this.target.length !== this.source.length) {
    throw new Error("Number of ids does not equal number of exps");
  }
  this.target.forEach((t, index) => {
    console.log(`t is ${util.inspect(t)}`);
    check.isAssignableTo(this.source[index], t.type);
    check.isNotConstant(t);
  });
};

//CHECK AGAINST OHM EDITOR
BinaryExpression.prototype.analyze = function (context) {
  console.log("IM THIS TYPE PLEEAZ");
  this.left.analyze(context);
  console.log("1");
  this.right.analyze(context);
  console.log("2");
  if (/[\^\-*\%/]/.test(this.op)) {
    // NEED TO ADD EXPO BACK
    console.log("3");
    check.isInteger(this.left);
    console.log("4");
    check.isInteger(this.right);
    console.log("5");
    this.type = IntType;
    console.log("6");
  } else if (/&&|\|\|/.test(this.op)) {
    // not sure if this is how you do && or ||
    check.isBoolean(this.left);
    console.log("3");
    check.isBoolean(this.right);
    console.log("4");
    this.type = BooleanType;
    console.log("5");
  } else if (/<=?|>=?/.test(this.op)) {
    console.log("3");
    check.sameType(this.left, this.right);
    console.log("4");
    check.isIntegerOrString(this.left);
    console.log("5");
    check.isIntegerOrString(this.right);
    console.log("6");
    this.type = BooleanType;
    console.log("7");
  } else if (/[+]/.test(this.op)) {
    console.log("3");
    try {
      check.isInteger(this.left);
      check.isInteger(this.right);
      this.type = IntType;
    } catch (e) {
      try {
        check.isString(this.left);
        check.isString(this.right);
        this.type = StringType;
      } catch (e) {
        throw new Error("can't concatenate unless string or integer");
      }
    }
  } else {
    console.log("in else");
    check.sameType(this.left, this.right);
    this.type = BooleanType;
  }
  console.log("IM THIS TYPE PLEEAZ");
  console.log(this.type);
};

Block.prototype.analyze = function (context) {
  this.statements.forEach((stmt) => {
    stmt.analyze(context);
  });
};

BreakStatement.prototype.analyze = function (context) {
  check.inLoop(context, "GTFO💩");
  if (!context.inLoop) {
    throw new Error("Break outside of loop");
  }
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
  this.body.analyze(context);
};

ClassDeclaration.prototype.analyze = function (context) {
  context.addClass(this.id, this);
  this.bodyContext = context.createChildContextForFunctionBody();
  this.params.forEach((p) => {
    p.analyze(this.bodyContext);
  });
  this.body.analyze(context);
};

ClassicForLoop.prototype.analyze = function (context) {
  const bodyContext = context.createChildContextForLoop();
  this.type = this.type.analyze(context);
  this.initexpression.analyze(context);
  check.isAssignableTo(this.initexpression, this.type);
  this.testExpression.analyze(context);
  check.isBoolean(this.testExpression, "Condition in for");
  const variableToIncrement = context.lookupVar(this.updateid);
  check.isIntegerOrLong(variableToIncrement, "Increment in for");
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
  this.body.analyze(context);
};

DictExpression.prototype.analyze = function (context) {
  this.expression.analyze(context);
  check.isDictionary(this.expression);

  if (this.expression.length) {
    this.type = new DictType(
      this.expression[0].keyType,
      this.expression[0].valueType
    );
    // do we need a new key value expression for this?
    // let keyValue = new KeyValueExpression(
    //   this.expression[0].keyType,
    //   this.expression[0].valueType
    // );
    // keyValue.analyze(context);
    for (let i = 1; i < this.expression.length; i += 1) {
      check.sameType(this.expression[i].keyType, this.type.keyType);
      check.sameType(this.expression[i].valueType, this.type.valueType);
      // keyValue = new KeyValueExpression(
      //   this.expression[i].keyType,
      //   this.expression[i].valueType
      // );
    }
  } else {
    this.type = new DictType(NoneType);
  }
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

FunctionDeclaration.prototype.analyzeSignature = function (context) {
  this.params = this.params.map((p) => new Parameter(p.type, p.id));
  this.params.forEach((p) => p.analyze(context));
  // this.type = this.type.analyze(context);
  if (this.type === "leftOnRead") {
    throw new Error("Void functions cannot have return statements");
  }
  this.bodyContext = context.createChildContextForFunctionBody(this);
  this.params.forEach((p) => p.analyze(this.bodyContext));
  context.addVar(this.id, this);
};

FunctionDeclaration.prototype.analyze = function (context) {
  console.log("IN FUNCDECL");
  this.analyzeSignature(context);
  this.body.analyze(this.bodyContext);
};

IdType.prototype.analyze = function (context) {
  this.type = context.lookupClass(this.type);
};

// TOOK FROM CASPER
IdentifierDeclaration.prototype.analyze = function (context) {
  this.type = context.lookupVar(this.id).type;
};

IdentifierExpression.prototype.analyze = function (context) {
  console.log("FUCK");
  console.log(`${util.inspect(this.id)}`);
  console.log(`CONTEXT: ${util.inspect(context)}`);
  // this.id.analyze(context);
  this.ref = context.lookupVar(this.id);
  this.type = this.ref.type;
};

IfStatement.prototype.analyze = function (context) {
  console.log("got past initial shit");
  this.tests.forEach((test) => {
    test.analyze(context);
    check.isBoolean(test);
    console.log("properly analyzing tests");
  });
  this.consequents.forEach((block) => {
    const blockContext = context.createChildContextForBlock();
    console.log("properly analyzing block maybe?");
    block.analyze(blockContext);
    console.log("did we get here?");
  });
  if (this.alternate) {
    const alternateBlock = context.createChildContextForBlock();
    this.alternate.analyze(alternateBlock);
  }
};

KeyValueExpression.prototype.analyze = function (context) {
  this.key.analyze(context);
  check.isExpression(this.key, "Key is not an expression");
  this.value.analyze(context);
  check.isExpression(this.value, "Value is not an expression");
};

PrintStatement.prototype.analyze = function (context) {
  // this.expression.analyze(context);
};

MemberExpression.prototype.analyze = function (context) {
  this.varexp.analyze(context);
  this.varexp = context.lookupVar(this.varexp);
  this.member = context.lookupVar(this.member);
  this.member.analyze(context);
};

Parameter.prototype.analyze = function (context) {
  // this.type = this.type.analyze(context);
  if (this.expression) {
    this.expression.analyze(context);
  }
  context.addVar(this.id, this);
  // console.log(context.variableDeclarations));
};

Program.prototype.analyze = function (context) {
  this.statements.forEach((stmt) => {
    stmt.analyze(context);
  });
};

ReturnStatement.prototype.analyze = function (context) {
  console.log("got to return");
  this.expression.analyze(context);
  console.log(
    `HI WE RETURNING THIS EXPRESSION ${util.inspect(this.expression)}`
  );
  // SEE IF FUCKED INFUNCTION
  check.inFunction(context, "Return statement not in function");
  check.isAssignableTo(this.expression, context.currentFunction.type);
};

SetExpression.prototype.analyze = function (context) {
  this.expression.forEach((m) => m.analyze(context));
  if (this.expression.length) {
    this.type = new SetType(this.expression[0].type);
    for (let i = 1; i < this.expression.length; i += 1) {
      check.sameType(this.expression[i].type, this.type.type);
    }
  } else {
    this.type = new SetType(NoneType);
  }
};

SetType.prototype.analyze = function (context) {
  this.memberType = this.memberType.analyze(context);
};

CallStatement.prototype.analyze = function (context) {
  this.call.analyze(context);
};

SpreadForLoop.prototype.analyze = function (context) {
  this.min.analyze(context);
  check.isIntegerOrLong(this.min, "Min in for loop is not a number");
  this.max.analyze(context);
  check.isIntegerOrLong(this.max, "Max in for loop is not a number");

  const bodyContext = context.createChildContextForLoop();
  this.body.analyze(bodyContext);
};

SwitchStatement.prototype.analyze = function (context) {
  this.expression.analyze(context);
  this.cases.forEach((c) => {
    // are we doing this portion correctly?/ is it recursively checking the way
    // we think it is just by calling case/ do we even need the analyze then?
    const currCase = new Case(c.expression, c.body);
    currCase.analyze(context);
  });
  if (this.alternate) {
    this.alternate = new DefaultCase(this.alternate.body);
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
  // this.expressions.analyze(context);
  // check.isTupleType(this.expressions);
  const memTypes = [];
  if (this.expression.length) {
    this.expressions.forEach((mem) => {
      mem.analyze(context);
      memTypes.push(mem.type);
    });
    this.type = new TupleType(memTypes);
  } else {
    this.type = new SetType(NoneType);
  }
};

UnaryExpression.prototype.analyze = function (context) {
  this.operand.analyze(context);
  if (["BANGENERGY"].includes(this.op)) {
    check.isBoolean(this.operand);
    this.type = BooleanType;
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

VariableDeclaration.prototype.analyze = function (context) {
  // this.type = this.type.analyze(context); xd this out because stuff was breaking
  check.sameNumberOfInitializersAsVariables(this.expressions, this.ids);
  this.variables = this.ids.map((id) => new Variable(this.type, id));
  this.variables.forEach((variable) =>
    context.addVar(variable.id.id, variable)
  );
  const a = new AssignmentStatement(this.ids, this.expressions);
  console.log(`context  is ${util.inspect(context, { depth: null })}`);
  console.log(`assignment stmt is ${util.inspect(a, { depth: null })}`);
  a.analyze(context);
};

WhileStatement.prototype.analyze = function (context) {
  this.expression.analyze(context);
  check.isBoolean(this.expression, "Condition in while");
  const bodyContext = context.createChildContextForLoop();
  this.body.analyze(bodyContext);
};
