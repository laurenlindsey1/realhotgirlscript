// Parser module
//
//   const parse = require('./parser');
//   const ast = parse(sourceCodeString);

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
const Closure = require('../ast/closure');
const ConstType = require('../ast/const-type');
const ContinueStatement = require('../ast/continue-statement');
const DictExpression = require('../ast/dict-expression');
const DictType = require('../ast/dict-type');
const FunctionDeclaration = require('../ast/function-declaration');
const IfStatement = require('../ast/if-statement');
const IntType = require('../ast/int-type');
const LongType = require('../ast/long-type');
const Loop = require('../ast/loop');
const Optionals = require('../ast/optionals');
const Print = require('../ast/print');
const Program = require('../ast/program');
const ReadStatement = require('../ast/read-statement');
const ReturnStatement = require('../ast/return-statement');
const SetExpression = require('../ast/set-expression');
const SetType = require('../ast/set-type');
const StringType = require('../ast/string-type');
const SwitchStatement = require('../ast/switch-statement');
const TupleType = require('../ast/tuple-type');
const TupleExpression = require('../ast/tuple-expression');
const Type = require('../ast/type');
const UnaryExpression = require('../ast/unary-expression');
const VariableDeclaration = require('../ast/variable-declaration');
const VariableExpression = require('../ast/variable-expression');
const WhileStatement = require('../ast/while-statement');
const WriteStatement = require('../ast/write-statement');


const grammar = ohm.grammar(fs.readFileSync('./grammar/realHotGirlScript.ohm'));

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function arrayToNullable(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program(statement) { return new Program(statement.ast()); },
  Stmt_simple(statement, _) { return statement.ast(); }, //does this need return new?
  Stmt_class(_1, id, _2, params, _3, body) {return new Class(id.ast(); params.ast(); body.ast();)}
  

  For(_1, id, _2, exps, suite) { return new ForStatement(id.ast(), exps.ast(), suite.ast()); },
  While(_, test, suite) { return new WhileStatement(test.ast(), suite.ast()); },
  Conditional(_1, firstTest, firstSuite, _2, moreTests, moreSuites, _3, lastSuite) {
    const tests = [firstTest.ast(), ...moreTests.ast()];
    const consequents = [firstSuite.ast(), ...moreSuites.ast()];
    const alternate = arrayToNullable(lastSuite.ast());
    return new IfStatement(tests, consequents, alternate);
  },
  FuncDec(annotation, _1, _2, id, _3, params, _4, suite) {
    return new FunctionDeclaration(annotation.ast(), id.ast(), params.ast(), suite.ast());
  },
  Annotation(id, _1, paramTypes, _2, resultTypes) {
    return new FunctionAnnotation(id.ast(), paramTypes.ast(), resultTypes.ast());
  },
  Error(_1, _2, e, _3, _4) { return new Error(e.sourceString); },
  // eslint-disable-next-line max-len
  VarConst(_1, t, v, _2, e) { return new VariableDeclaration(v.ast(), t.sourceString, e.ast(), false); },
  // eslint-disable-next-line max-len
  VarMutable(_1, t, v, _2, e) { return new VariableDeclaration(v.ast(), t.sourceString, e.ast(), true); },
  Assignment(v, _, e) { return new AssignmentStatement(v.ast(), e.ast()); },
  SimpleStmt_break(_) { return new BreakStatement(); },
  SimpleStmt_return(_, e) { return new ReturnStatement(arrayToNullable(e.ast())); },
  Suite_small(_1, statement, _2) { return [statement.ast()]; },
  Suite_large(_1, _2, _3, statements, _4) { return statements.ast(); },
  Exp_or(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp_and(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp1_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp2_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp3_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp4_unary(op, operand) { return new UnaryExpression(op.ast(), operand.ast()); },
  Exp5_power(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp6_list(_1, expressions, _2) { return new ListExpression(expressions.ast()); },
  Exp6_dictionary(_1, expressions, _2) { return new DictionaryExpression(expressions.ast()); },
  Exp6_tuple(_1, expressions, _2) { return new TupleExpression(expressions.ast()); },
  Exp6_parens(_1, expression, _2) { return expression.ast(); },
  Call(callee, _1, args, _2) { return new CallStatement(callee.ast(), args.ast()); },
  VarExp_subscripted(v, _1, e, _2) { return new SubscriptedExpression(v.ast(), e.ast()); },
  VarExp_simple(id) { return new IdentifierExpression(id.ast()); },
  Param(id, _, exp) { return new Parameter(id.ast(), arrayToNullable(exp.ast())); },
  Arg(id, _, exp) { return new Argument(arrayToNullable(id.ast()), exp.ast()); },
  KeyVal(id, _, exp) { return new KeyValue(id.ast(), exp.ast()); },
  ListType(_1, _2, type, _3) { return new ListTypeExpression(type.ast()); },
  TupleType(_1, _2, type, _3) { return new TupleTypeExpression(type.ast()); },
  DictType(_1, _2, key, _3, value, _4) { return new DictTypeExpression(key.ast(), value.ast()); },
  NonemptyListOf(first, _, rest) { return [first.ast(), ...rest.ast()]; },
  EmptyListOf() { return []; },
  id(_1, _2) { return this.sourceString; },
  numlit(_1, _2, _3, _4, _5, _6) { return new NumericLiteral(+this.sourceString); },
  boollit(_) { return new BooleanLiteral(this.sourceString === 'verdad'); },
  strlit(_1, chars, _6) { return new StringLiteral(this.sourceString); },
  nonelit(_) { return new NoneLiteral(this.sourceString); },
  _terminal() { return this.sourceString; },
});
/* eslint-enable no-unused-vars */

module.exports = (text) => {
  const match = grammar.match(withIndentsAndDedents(text));
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return astGenerator(match).ast();
};
