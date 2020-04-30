const Argument = require('../ast/argument');
const ArrayExpression = require('../ast/array-expression');
const ArrayType = require('../ast/array-type');
const AssignmentStatement = require('../ast/assignment-statement');
const Block = require('../ast/block');
const BooleanLiteral = require('../ast/boolean-literal');
const BinaryExpression = require('../ast/binary-expression');
const BreakStatement = require('../ast/break-statement');
const Call = require('../ast/call');
const Case = require('../ast/case');
const ClassDeclaration = require('../ast/class-declaration');
const { ClassicForLoop, SpreadForLoop } = require('../ast/loop');
const ContinueStatement = require('../ast/continue-statement');
const DefaultCase = require('../ast/default-case');
const DictExpression = require('../ast/dict-expression');
const DictType = require('../ast/dict-type');
const FunctionDeclaration = require('../ast/function-declaration');
const IdentifierDeclaration = require('../ast/identifier-declaration');
const IdentifierExpression = require('../ast/identifier-expression');
const IdType = require('../ast/id-type');
const IfStatement = require('../ast/if-statement');
const KeyValueExpression = require('../ast/keyvalue-expression');
const MemberExpression = require('../ast/member-expression');
const NoneLiteral = require('../ast/none-literal');
const NumericLiteral = require('../ast/numeric-literal');
const Parameter = require('../ast/parameter');
const PrintStatement = require('../ast/print-statement');
const Program = require('../ast/program');
const ReturnStatement = require('../ast/return-statement');
const SetExpression = require('../ast/set-expression');
const SetType = require('../ast/set-type');
const StringLiteral = require('../ast/string-literal');
const SubscriptedExpression = require('../ast/subscripted-expression');
const SwitchStatement = require('../ast/switch-statement');
const CallStatement = require('../ast/call-statement');
const TupleType = require('../ast/tuple-type');
const TupleExpression = require('../ast/tuple-expression');
const UnaryExpression = require('../ast/unary-expression');
const VariableDeclaration = require('../ast/variable-declaration');
const Variable = require('../ast/variable');
const WhileStatement = require('../ast/while-statement');

const IntType = require('../ast/int-type');
const NoneType = require('../ast/none-type');
const BooleanType = require('../ast/boolean-type');
const LongType = require('../ast/long-type');
const StringType = require('../ast/string-type');

const check = require('./check');
const Context = require('./context');

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
};

ArrayExpression.prototype.analyze = function (context) {
  this.expressions.forEach(m => m.analyze(context));
  if (this.expressions.length) {
    this.type = new ArrayType(this.expressions[0].type);
    for (let i = 1; i < this.expressions.length; i += 1) {
      check.isAssignableTo(this.expressions[i], this.type.memberType);
    }
  } else {
    this.type = new ArrayType(NoneType);
  }
};

ArrayType.prototype.analyze = function (context) {
  this.memberType = this.memberType.analyze(context);
};

AssignmentStatement.prototype.analyze = function (context) {
  this.source.forEach(s => s.analyze(context));
  this.target.forEach(id => id.analyze(context));
  if (this.target.length !== this.source.length) {
    throw new Error('Number of ids does not equal number of exps');
  }
  this.target.forEach((t, index) => {
    check.isAssignableTo(this.source[index], t.type);
    check.isNotConstant(t);
  });
};

BinaryExpression.prototype.analyze = function (context) {
  this.left.analyze(context);
  this.right.analyze(context);
  if (/[\^\-*%/]/.test(this.op)) {
    check.isInteger(this.left);
    check.isInteger(this.right);
    this.type = IntType;
  } else if (/&&|\|\|/.test(this.op)) {
    check.isBoolean(this.left);
    check.isBoolean(this.right);
    this.type = BooleanType;
  } else if (/<=?|>=?/.test(this.op)) {
    check.sameType(this.left, this.right);
    check.isIntegerOrString(this.left);
    check.isIntegerOrString(this.right);
    this.type = BooleanType;
  } else if (/[+]/.test(this.op)) {
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
        throw new Error('Cannot concatenate unless string or integer');
      }
    }
  } else {
    check.sameType(this.left, this.right);
    this.type = BooleanType;
  }
};

Block.prototype.analyze = function (context) {
  this.statements.forEach(stmt => {
    stmt.analyze(context);
  });
};

BreakStatement.prototype.analyze = function (context) {
  check.breakMustAppearInLoopOrSwitch(context);
};

Call.prototype.analyze = function (context) {
  this.id = context.lookup(this.id);
  this.type = check.isFunctionOrClass(this.id, 'Attempt to call a non-function');
  this.args.forEach(arg => arg.analyze(context));
  check.legalArguments(this.args, this.id.params);
  check.asyncAwait(this.id.async, this.wait);
};

Case.prototype.analyze = function (context) {
  this.expression.analyze(context);
  this.type = this.expression.type;
  this.body.analyze(context);
};

ClassDeclaration.prototype.analyze = function (context) {
  context.add(this.id, this);
  this.bodyContext = context.createChildContextForFunctionBody();
  this.params.forEach(p => {
    p.analyze(this.bodyContext);
  });
  this.body.analyze(context);
};

ClassicForLoop.prototype.analyze = function (context) {
  const bodyContext = context.createChildContextForLoop();
  this.initexpression.analyze(bodyContext);
  check.isAssignableTo(this.initexpression, this.type);
  this.index = new VariableDeclaration(
    false,
    this.initexpression.type,
    [this.initId],
    [this.initexpression]
  );
  bodyContext.add(this.index.ids[0], this.index);
  this.testExpression.analyze(bodyContext);
  check.isBoolean(this.testExpression, 'Condition in for');
  const variableToIncrement = bodyContext.lookup(this.updateid);
  check.isIntegerOrLong(variableToIncrement, 'Increment in for');
  this.body.analyze(bodyContext);
};

ContinueStatement.prototype.analyze = function (context) {
  check.inLoop(context, 'keepItPushin');
};

DefaultCase.prototype.analyze = function (context) {
  this.body.analyze(context);
};

DictExpression.prototype.analyze = function (context) {
  this.expressions.forEach(m => m.analyze(context));

  if (this.expressions.length) {
    check.isKeyValueExpression(this.expressions[0]);
    let keyType = undefined;
    let valueType = undefined;
    if (this.expressions[0].key) {
      keyType = this.expressions[0].key.type;
    }
    if (this.expressions[0].value) {
      valueType = this.expressions[0].value.type;
    }
    this.type = new DictType(keyType, valueType);
    for (let i = 1; i < this.expressions.length; i += 1) {
      check.isAssignableTo(this.expressions[i].key, this.type.keyType);
      check.isAssignableTo(this.expressions[i].value, this.type.valueType);
    }
  } else {
    this.type = new DictType(NoneType);
  }
};

DictType.prototype.analyze = function (context) {
  this.keyType = this.keyType.analyze(context);
  this.valueType = this.valueType.analyze(context);
  check.isDictionary(this);
};

FunctionDeclaration.prototype.analyze = function (context) {
  const bodyContext = context.createChildContextForFunctionBody(this);
  this.params.forEach(p => p.analyze(bodyContext));
  context.add(this.id, this);
  this.type = this.type === 'leftOnRead' ? NoneType : this.type;
  this.body.analyze(bodyContext);
};

IdType.prototype.analyze = function (context) {
  this.type = context.lookup(this.type);
};

IdentifierDeclaration.prototype.analyze = function (context) {
  this.type = context.lookup(this.id).type;
};

IdentifierExpression.prototype.analyze = function (context) {
  this.ref = context.lookup(this.id);
  this.type = this.ref.type;
};

IfStatement.prototype.analyze = function (context) {
  this.tests.forEach(test => {
    test.analyze(context);
    check.isBoolean(test);
  });
  this.consequents.forEach(block => {
    const blockContext = context.createChildContextForBlock();
    block.analyze(blockContext);
  });
  if (this.alternate) {
    const alternateBlock = context.createChildContextForBlock();
    this.alternate.analyze(alternateBlock);
  }
};

KeyValueExpression.prototype.analyze = function (context) {
  this.key.analyze(context);
  this.value.analyze(context);
};

PrintStatement.prototype.analyze = function (context) {
  this.expression.analyze(context);
};

MemberExpression.prototype.analyze = function (context) {
  this.varexp.analyze(context);
  check.hasMemberExpression(this.varexp.this.member);
  this.type = this.member.type;
};

Parameter.prototype.analyze = function (context) {
  if (this.expression) {
    this.expression.analyze(context);
  }
  context.add(this.id, this);
};

Program.prototype.analyze = function (context) {
  this.statements.forEach(stmt => {
    stmt.analyze(context);
  });
};

ReturnStatement.prototype.analyze = function (context) {
  this.expression.analyze(context);
  check.inFunction(context, 'Return statement not in function');

  if (context.currentFunction.type.name === 'None') {
    throw new Error('Void functions cannot have return statements');
  }
  check.isAssignableTo(this.expression, context.currentFunction.type);
};

SetExpression.prototype.analyze = function (context) {
  this.expressions.forEach(m => m.analyze(context));
  if (this.expressions.length) {
    this.type = new SetType(this.expressions[0].type);
    for (let i = 1; i < this.expressions.length; i += 1) {
      check.isAssignableTo(this.expressions[i], this.type.memberType);
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
  check.isIntegerOrLong(this.min, 'Min in for loop is not a number');
  this.max.analyze(context);
  check.isIntegerOrLong(this.max, 'Max in for loop is not a number');

  const bodyContext = context.createChildContextForLoop();
  this.body.analyze(bodyContext);
};

SwitchStatement.prototype.analyze = function (context) {
  const bodyContext = context.createChildContextForSwitch();
  bodyContext.inSwitch = true;
  this.expression.analyze(bodyContext);
  this.cases.forEach(c => {
    let currCase = new Case(c.expression, c.body);
    currCase.analyze(bodyContext);
    check.isAssignableTo(this.expression.ref, currCase.type);
  });
  if (this.alternate) {
    this.alternate = new DefaultCase(this.alternate.body);
  }
};

SubscriptedExpression.prototype.analyze = function (context) {
  //this.varexp = context.lookup(this.varexp.id);
  this.varexp.analyze(context);
  this.subscript.analyze(context);
  check.isNotSubscriptable(this.varexp);
  check.isInteger(this.subscript);
  // TODO SET TYPE HERE
};

TupleType.prototype.analyze = function (context) {
  this.memberTypes = this.memberTypes.map(t => t.analyze(context));
};

TupleExpression.prototype.analyze = function (context) {
  let memTypes = new Set();
  if (this.expressions.length) {
    this.expressions.forEach(mem => {
      mem.analyze(context);
      memTypes.add(mem.type);
    });
    memTypes = [...memTypes];
    this.type = new TupleType(memTypes);
  } else {
    this.type = new TupleType(NoneType);
  }
};

UnaryExpression.prototype.analyze = function (context) {
  this.operand.analyze(context);
  if (['BANGENERGY'].includes(this.op)) {
    check.isBoolean(this.operand);
    this.type = BooleanType;
  } else if (['-', '+'].includes(this.op)) {
    try {
      check.isInteger(this.operand);
      this.type = IntType;
    } catch (e) {
      try {
        check.isLong(this.operand);
        this.type = LongType;
      } catch (e) {
        throw new Error('Not an IntType');
      }
    }
  }
};

VariableDeclaration.prototype.analyze = function (context) {
  check.sameNumberOfInitializersAsVariables(this.expressions, this.ids);
  this.variables = this.ids.map(id => new Variable(this.constant, this.type, id));
  this.variables.forEach(variable => context.add(variable.id.id, variable));
  const a = new AssignmentStatement(this.ids, this.expressions);
  a.analyze(context);
};

WhileStatement.prototype.analyze = function (context) {
  this.expression.analyze(context);
  check.isBoolean(this.expression, 'Condition in while');
  const bodyContext = context.createChildContextForLoop();
  this.body.analyze(bodyContext);
};
