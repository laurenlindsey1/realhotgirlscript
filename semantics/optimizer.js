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

module.exports = program => program.optimize();

function isZero(e) {
  return e instanceof NumericLiteral && e.value === 0;
}

function isOne(e) {
  return e instanceof NumericLiteral && e.value === 1;
}

function bothLiterals(b) {
  if (b.left instanceof NumericLiteral && b.right instanceof NumericLiteral) {
    return b.left instanceof NumericLiteral && b.right instanceof NumericLiteral;
  }
  else if (b.left instanceof BooleanLiteral && b.right instanceof BooleanLiteral) {
    b.left instanceof BooleanLiteral && b.right instanceof BooleanLiteral;
  }
  else if (b.left instanceof StringLiteral && b.right instanceof StringLiteral) {
    b.left instanceof StringLiteral && b.right instanceof StringLiteral;
  }
  else {
    return b.left instanceof NoneLiteral && b.right instanceof NoneLiteral;
  }
}

Argument.prototype.optimize = function () {
  return this;
};

ArrayExpression.prototype.optimize = function () {
  this.expressions = this.expressions.map(e => e.optimize());
  return this;
};

ArrayType.prototype.optimize = function () {
  return this;
};

AssignmentStatement.prototype.optimize = function () {
  this.target = this.target.map(e => e.optimize());
  this.source = this.source.map(v => v.optimize());
  return this;
};

Block.prototype.optimize = function () {
  return this;
};

BooleanLiteral.prototype.optimize = function () {
  return this;
};

BinaryExpression.prototype.optimize = function () {
  this.left = this.left.optimize();
  this.right = this.right.optimize();
  if (this.op === '+' && isZero(this.right)) return this.left;
  if (this.op === '+' && isZero(this.left)) return this.right;
  if (this.op === '*' && isZero(this.right)) return new NumericLiteral(0);
  if (this.op === '*' && isZero(this.left)) return new NumericLiteral(0);
  if (this.op === '*' && isOne(this.right)) return this.left;
  if (this.op === '*' && isOne(this.left)) return this.right;
  if (bothLiterals(this)) {
    const [x, y] = [this.left.value, this.right.value];
    if (this.left instanceof StringLiteral) {
      if (this.op === '+') return new StringLiteral(x + y);
    }
    if (this.op === '+') return new NumericLiteral(x + y);
    if (this.op === '*') return new NumericLiteral(x * y);
    if (this.op === '/') return new NumericLiteral(x / y);
  }
  return this;
};

BreakStatement.prototype.optimize = function () {
  return this;
};

Call.prototype.optimize = function () {
  this.args = this.args.map(a => a.optimize());
  this.id = this.id.optimize();
  return this;
};

CallStatement.prototype.optimize = function () {
  return this;
};

Case.prototype.optimize = function () {
  return this;
};

ClassDeclaration.prototype.optimize = function () {
  return this;
};

ClassicForLoop.prototype.optimize = function () {
  return this;
};

ContinueStatement.prototype.optimize = function () {
  return this;
};

DefaultCase.prototype.optimize = function () {
  return this;
};

DictExpression.prototype.optimize = function () {
  return this;
};

DictType.prototype.optimize = function () {
  return this;
};

FunctionDeclaration.prototype.optimize = function () {
  if (this.body) {
    this.body = this.body.optimize();
  }
  return this;
};

IdentifierDeclaration.prototype.optimize = function () {
  return this;
};

IdentifierExpression.prototype.optimize = function () {
  return this;
};

IdType.prototype.optimize = function () {
  return this;
};

IfStatement.prototype.optimize = function () {
  this.tests = this.tests.map(t => t.optimize());
  this.consequents = this.consequents.map(c => c.optimize());
  if (this.alternate) { this.alternate = this.alternate.optimize(); }
  return this;
};

KeyValueExpression.prototype.optimize = function () {
  return this;
};

MemberExpression.prototype.optimize = function () {
  this.varexp = this.varexp.optimize();
  return this;
};

NoneLiteral.prototype.optimize = function () {
  return this;
};

NumericLiteral.prototype.optimize = function () {
  return this;
};

Parameter.prototype.optimize = function () {
  return this;
};

PrintStatement.prototype.optimize = function () {
  this.expression = this.expression.optimize();
  return this;
};

Program.prototype.optimize = function () {
  for (let i = 0; i < this.statements.length; i += 1) {
    this.statements[i] = this.statements[i].optimize();
  }
  this.statements.filter(s => s !== null);
  return this;
};

ReturnStatement.prototype.optimize = function () {
  this.expression = this.expression.optimize();
  return this;
};

SetExpression.prototype.optimize = function () {
  for (let i = 0; i < this.expressions.length; i += 1) {
    this.expressions[i] = this.expressions[i].optimize();
  }
  return this;
};

SetType.prototype.optimize = function () {
  return this;
};

SpreadForLoop.prototype.optimize = function () {
  this.min = this.min.optimize();
  this.max = this.max.optimize();
  if (this.min.value === this.max.value) {
    this.body = null;
    return this;
  }
  this.body = this.body.optimize();
  return this;
};

StringLiteral.prototype.optimize = function () {
  return this;
};

SubscriptedExpression.prototype.optimize = function () {
  this.varexp = this.varexp.optimize();
  this.subscript = this.subscript.optimize();
  return this;
};

SwitchStatement.prototype.optimize = function () {
  return this;
};

TupleExpression.prototype.optimize = function () {
  return this;
};

TupleType.prototype.optimize = function () {
  return this;
};

UnaryExpression.prototype.optimize = function () {
  this.operand = this.operand.optimize();
  if (this.op === 'BANGENERGY') {
    return (new BooleanLiteral(!this.operand.value));
    // eslint-disable-next-line no-else-return
  } else if (this.op === '-') {
    return (new NumericLiteral(-this.operand.value));
  }
  return this;
};

VariableDeclaration.prototype.optimize = function () {
  this.expressions.forEach(e => e.optimize());
  return this;
};

Variable.prototype.optimize = function () {
  return this;
};

WhileStatement.prototype.optimize = function () {
  this.expression = this.expression.optimize();
  if (this.expression instanceof BooleanLiteral && this.expression.value == "fraudulentAssBitch") {
    this.body = null;
    return this;
  }
  this.body = this.body.optimize();
  return this;
};