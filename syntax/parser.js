const fs = require('fs');

const ohm = require('ohm-js');

const ArrayExpression = require('../ast/array-expression');
const ArrayType = require('../ast/array-type');
const AssignmentStatement = require('../ast/assignment-statement');
const BinaryExpression = require('../ast/binary-expression');
const Block = require('../ast/block');
const BooleanType = require('../ast/boolean-type');
const BreakStatement = require('../ast/break-statement');
const Call = require('../ast/call');
const ClassDeclaration = require('../ast/class-declaration');
const ContinueStatement = require('../ast/continue-statement');
const DictExpression = require('../ast/dict-expression');
const DictType = require('../ast/dict-type');
const FunctionDeclaration = require('../ast/function-declaration');
const IfStatement = require('../ast/if-statement');
const LongType = require('../ast/long-type');
const IntType = require('../ast/int-type');
const Loop = require('../ast/loop');
const NumericLiteral = require('../ast/numeric-literal');
const Print = require('../ast/print');
const Program = require('../ast/program');
const ReturnStatement = require('../ast/return-statement');
const DefaultCase = require('../ast/default-case');
const SetExpression = require('../ast/set-expression');
const SetType = require('../ast/set-type');
const StringType = require('../ast/string-type');
const SwitchStatement = require('../ast/switch-statement');
const CallStatement = require('../ast/call-statement');
const TupleType = require('../ast/tuple-type');
const TupleExpression = require('../ast/tuple-expression');
const UnaryExpression = require('../ast/unary-expression');
const VariableDeclaration = require('../ast/variable-declaration');
const WhileStatement = require('../ast/while-statement');
const Case = require('../ast/case');
const KeValueExpression = require('../ast/keyvalue-expression');
const SubscriptedExpression = require('../ast/subscripted-expression');
const IdentifierExpression = require('../ast/identifier-expression');
const IdentifierDeclaration = require('../ast/identifier-declaration');
const Parameter = require('../ast/parameter');
const Argument = require('../ast/argument');
const StringLiteral = require('../ast/string-literal');
const BooleanLiteral = require('../ast/boolean-literal');
const IdType = require('../ast/id-type');
const PrintStatement = require('../ast/print-statement');
const Fraction = require('../ast/fraction');
const Exponent = require('../ast/exponent');
const NoneLiteral = require('../ast/none-literal');

const realHotGirlScript = ohm.grammar(fs.readFileSync('grammar/realHotGirlScript.ohm'));

function arrayToNullable(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astGenerator = realHotGirlScript.createSemantics().addOperation('ast', {
  Program(statement) {
    return new Program(statement.ast());
  },

  Stmt_simple(statement, _) {
    return statement.ast();
  },

  Stmt_class(_1, id, _2, params, _3, body) {
    return new ClassDeclaration(id.ast(), params.ast(), body.ast());
  },

  Stmt_function(async, _1, type, id, _2, params, _3, body) {
    return new FunctionDeclaration(
      arrayToNullable(async.ast()),
      type.ast(),
      id.ast(),
      params.ast(),
      body.ast()
    );
  },

  Stmt_while(_, expression, body) {
    return new WhileStatement(expression.ast(), body.ast());
  },

  Stmt_if(_1, firstTest, firstBlock, _2, moreTests, moreBlocks, _3, lastBlock) {
    const tests = [firstTest.ast(), ...moreTests.ast()];
    const consequents = [firstBlock.ast(), ...moreBlocks.ast()];
    const alternate = arrayToNullable(lastBlock.ast());
    return new IfStatement(tests, consequents, alternate);
  },

  Stmt_switch(_1, expression, _2, cases, alternate, _3) {
    return new SwitchStatement(expression.ast(), cases.ast(), arrayToNullable(alternate.ast()));
  },

  Stmt_forloop1(
    _1,
    type,
    initid,
    _2,
    initexpression,
    _3,
    testexpression,
    _4,
    updateid,
    incop,
    body
  ) {
    return new Loop.ClassicForLoop(
      type.ast(),
      initid.ast(),
      initexpression.ast(),
      testexpression.ast(),
      updateid.ast(),
      incop.ast(),
      body.ast()
    );
  },

  Stmt_forloop2(_1, _2, min, _3, max, _4, body) {
    return new Loop.SpreadForLoop(min.ast(), max.ast(), body.ast());
  },

  //change to plural
  SimpleStmt_varDecl(constant, type, ids, _, expressions) {
    return new VariableDeclaration(
      arrayToNullable(constant.ast()),
      type.ast(),
      ids.ast(),
      expressions.ast()
    );
  },

  SimpleStmt_assign(target, _, source) {
    return new AssignmentStatement(target.ast(), source.ast());
  },

  SimpleStmt_call(call) {
    return new CallStatement(call.ast());
  },

  SimpleStmt_print(expression) {
    return new PrintStatement(expression.ast());
  },

  SimpleStmt_break(_) {
    return new BreakStatement();
  },

  SimpleStmt_continue(_) {
    return new ContinueStatement();
  },

  SimpleStmt_return(_, expression) {
    return new ReturnStatement(arrayToNullable(expression.ast()));
  },

  Block(_1, statements, _2) {
    return new Block(statements.ast());
  },

  Print(_, exp) {
    return new Print(exp.ast());
  },

  Case(_, expression, body) {
    return new Case(expression.ast(), body.ast());
  },

  DefaultCase(_, body) {
    return new DefaultCase(body.ast());
  },

  Exp_or(left, op, right) {
    return new BinaryExpression(left.ast(), op.ast(), right.ast());
  },

  Exp_and(left, op, right) {
    return new BinaryExpression(left.ast(), op.ast(), right.ast());
  },

  Exp1_binary(left, op, right) {
    return new BinaryExpression(left.ast(), op.ast(), right.ast());
  },

  Exp2_binary(left, op, right) {
    return new BinaryExpression(left.ast(), op.ast(), right.ast());
  },

  Exp3_binary(left, op, right) {
    return new BinaryExpression(left.ast(), op.ast(), right.ast());
  },

  Exp4_unary(op, operand) {
    return new UnaryExpression(op.ast(), operand.ast());
  },

  Exp5_increment(op, operand) {
    return new UnaryExpression(op.ast(), operand.ast());
  },

  Exp6_exponentiation(left, op, right) {
    return new BinaryExpression(left.ast(), op.ast(), right.ast());
  },

  Exp7_arrays(_1, expression, _2) {
    return new ArrayExpression(expression.ast());
  },

  Exp7_set(_1, expression, _2) {
    return new SetExpression(expression.ast());
  },

  Exp7_dict(_1, expression, _2) {
    return new DictExpression(expression.ast());
  },

  Exp7_tuple(_1, expressions, _2) {
    return new TupleExpression(expressions.ast());
  },

  Exp7_parens(_1, expression, _2) {
    return expression.ast();
  },

  KeyValue(key, _, value) {
    return new KeValueExpression(key.ast(), value.ast());
  },

  Call(wait, id, _1, args, _2) {
    return new Call(arrayToNullable(wait.ast()), id.ast(), args.ast());
  },

  VarExp_subscripted(varexp, _1, subscripted, _2) {
    return new SubscriptedExpression(varexp.ast(), subscripted.ast());
  },

  VarExp_member(varexp, _1, id) {
    return new SubscriptedExpression(varexp.ast(), id.ast());
  },

  VarExp_simple(id) {
    return new IdentifierExpression(id.ast());
  },

  DeclId(id) {
    return new IdentifierDeclaration(id.ast());
  },

  Param(type, id, _, expression) {
    return new Parameter(type.ast(), id.ast(), arrayToNullable(expression.ast()));
  },

  Arg(id, _, expression) {
    return new Argument(id.ast(), expression.ast());
  },

  Type_id(id) {
    return new IdType(id.ast());
  },

  NonemptyListOf(first, _, rest) {
    return [first.ast(), ...rest.ast()];
  },

  EmptyListOf() {
    return [];
  },

  id(_, id) {
    return this.sourceString;
  },

  intType(_) {
    return IntType;
  },

  longType(_) {
    return LongType;
  },

  stringType(_) {
    return StringType;
  },

  booleanType(_) {
    return BooleanType;
  },

  ArrayType(_1, _2, memberType, _3) {
    return new ArrayType(memberType.ast());
  },

  SetType(_1, _2, memberType, _3) {
    return new SetType(memberType.ast());
  },

  DictType(_0, _1, keyType, _2, valueType, _3) {
    return new DictType(keyType.ast(), valueType.ast());
  },

  TupleType(_0, _1, type, _2, moreTypes, _3) {
    return new TupleType([type.ast(), ...moreTypes.ast()]);
  },

  numlit(sign, digits, frac, exponent) {
    return new NumericLiteral(+this.sourceString);
  },

  boollit(_) {
    return new BooleanLiteral(this.sourceString);
  },

  strlit(_1, chars, _6) {
    return new StringLiteral(this.sourceString);
  },

  _terminal() {
    return this.sourceString;
  },

  frac(_, digit) {
    return new Fraction(this.sourceString);
  },

  eExpo(lettere, sign, digit) {
    return new Exponent(lettere.ast(), sign.ast(), this.sourceString);
  },

  nonelit(_) {
    return new NoneLiteral();
  },
});
/* eslint-enable no-unused-vars */

module.exports = text => {
  const match = realHotGirlScript.match(text);
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return astGenerator(match).ast();
};
