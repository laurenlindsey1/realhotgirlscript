// Parser module
//
//   const parse = require('./parser');
//   const ast = parse(sourceCodeString);

const ohm = require("ohm-js");

const ArrayExpression = require("../ast/array-expression");
const ArrayType = require("../ast/array-type");
const AssignmentStatement = require("../ast/assignment-statement");
const BinaryExpression = require("../ast/binary-expression");
const Block = require("../ast/block");
const BooleanType = require("../ast/boolean-type");
const BreakStatement = require("../ast/break-statement");
const Call = require("../ast/call");
const ClassDeclaration = require("../ast/class-declaration");
const Closure = require("../ast/closure");
const ConstType = require("../ast/const-type");
const ContinueStatement = require("../ast/continue-statement");
const DictExpression = require("../ast/dict-expression");
const DictType = require("../ast/dict-type");
const FunctionDeclaration = require("../ast/function-declaration");
const IfStatement = require("../ast/if-statement");
const IntType = require("../ast/int-type");
const LongType = require("../ast/long-type");
const Loop = require("../ast/loop");
const Optionals = require("../ast/optionals");
const Print = require("../ast/print");
const Program = require("../ast/program");
const ReadStatement = require("../ast/read-statement");
const ReturnStatement = require("../ast/return-statement");
const SetExpression = require("../ast/set-expression");
const SetType = require("../ast/set-type");
const StringType = require("../ast/string-type");
const SwitchStatement = require("../ast/switch-statement");
const TupleType = require("../ast/tuple-type");
const TupleExpression = require("../ast/tuple-expression");
const Type = require("../ast/type");
const UnaryExpression = require("../ast/unary-expression");
const VariableDeclaration = require("../ast/variable-declaration");
const VariableExpression = require("../ast/variable-expression");
const WhileStatement = require("../ast/while-statement");
const WriteStatement = require("../ast/write-statement");
const Case = require("../ast/case");
const KeValueExpression = require("../ast/keyvalue-expression");
const SubscriptedExpression = require("../ast/subscripted-expression");
const MemberExpression = require("../ast/member-expression");
const IdentifierExpression = require("../ast/identifier-expression");
const IdentifierDeclaration = require("../ast/identifier-declaration");
const Paramter = require("../ast/parameter");
const Argument = require("../ast/argument");
const IdType = require("../ast/id-type");

const grammar = ohm.grammar(fs.readFileSync("./grammar/realHotGirlScript.ohm"));

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function arrayToNullable(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation("ast", {
  Program(statement) {
    return new Program(statement.ast());
  },
  Stmt_simple(statement, _) {
    return statement.ast();
  }, //does this need return new?
  Stmt_class(_1, id, _2, params, _3, body) {
    return new Class(id.ast(), params.ast(), body.ast());
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
  Stmt_if(_, cases, alternate) {
    return new IfElseStatement(cases.ast(), arrayToNullable(alternate.ast()));
  },
  Stmt_switch(_, expression, cases, alternate) {
    return new SwitchStatement(
      expression.ast(),
      cases.ast(),
      arrayToNullable(alternate.ast())
    );
  },

  Stmt_forLoop1(
    _1,
    type,
    id,
    _2,
    expression,
    _3,
    id1,
    _4,
    expression1,
    _5,
    id2,
    _6,
    body
  ) {
    // :)  //IS THIS RIGHT?
  },

  // HOW DO WE DEAL WITH THE SPREAD RIGHT NOW WE ARE JUST SAYING THAT IT IS AN _ BUT SHE NEEDS FUNCTIONALITY
  Stmt_foorLoop2(_1, _2, expression, _3, expression1, _4, body) {
    return new SpreadForLoop(expression.ast(), body.ast()); //do we need to deal with multiple expressions in here?
  },

  SimpleStmt_varDecl(constant, type, id, _, expression) {
    // right now we are not distinguishing b/n plural values / arrays
    return new VariableDeclaration(
      arrayToNullable(constant.ast()),
      type.ast(),
      id.ast(),
      expression.ast()
    );
  },

  SimpleStmt_assign(target, _, source) {
    return new AssignmentStatement(target.ast(), source.ast());
  },

  SimpleStmt_call(await, id, _1, args, _2) {
    return new Call(arrayToNullable(await.ast()), id.ast(), args.ast());
  },

  SimpleStmt_print(expression) {
    return new Print(expression.ast());
  },

  SimpleStmt_break() {
    return new BreakStatement();
  },

  SimpleStmt_continue() {
    return new ContinueStatement();
  },

  SimpleStmt_return(_, expression) {
    return new ReturnStatement(arrayToNullable(expression.ast()));
  },

  Block(_1, statements, _2) {
    return new Block(statements.ast());
  },

  Case(_, expression, body) {
    return new Case(expression.ast(), body.ast());
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

  Exp5_optional(operand) {
    return new Expression(operand.ast()); // IS THIS RIGHT? HOW TO FIX GRAMMAR?
  },

  Exp6_increment(op, operand) {
    return new UnaryExpression(op.ast(), operand.ast());
  },

  Exp7_exponentiation(op, operand) {
    return new BinaryExpression(op.ast(), operand.ast()); //  DO WE NEED  A CLASS FOR
  },

  Exp8_closure(_1, id, _2, expression, _3) {
    return new Closure(id.ast(), expression.ast()); //  HOW TO DEAL WITH EXP@ GO BACK AND FIX SINGULAR VS PLURAL
  },

  Exp9_arrays(_1, expression, _2) {
    return new ArrayExpression(expression.ast());
  },

  Exp9_set(_1, expression, _2) {
    return new SetExpression(expression.ast());
  },

  Exp9_dict(_1, expression, _2) {
    return new SetExpression(expression.ast());
  },

  Exp9_tuple(_1, expression, _2) {
    return new SetExpression(expression.ast());
  },

  Exp9_parens(_1, expression, _2) {
    return new expression.ast();
  },

  KeyValue(key, _, value) {
    return new KeValueExpression(key.ast(), value.ast());
  },

  VarExp_subscripted(varexp, _1, subscripted, _2) {
    return new SubscriptedExpression(varexp.ast(), subscripted.ast());
  },

  VarExp_member(varexp, _1, id) {
    return new SubscriptedExpression(varexp.ast(), id.ast());
  },

  VarExp_simple(id) {
    // GO BACK AND DELETE ALL RANDOM TAGS
    return new IdentifierExpression(id.ast());
  },

  DeclId(id) {
    // GO BACK AND DELETE ALL RANDOM TAGS
    return new IdDeclaration(id.ast());
  },

  Params(expression) {
    return new Params(expression.ast());
  },

  Arguments(type, id, _, expression) {
    return new Argument(type.ast(), id.ast(), expression.ast());
  },

  IntType(_) {
    return IntType;
  },
  LongType(_) {
    return LongType;
  },
  StringType(_) {
    return StringType;
  },
  BooleanType(_) {
    return BooleanType;
  },
  IdType(id) {
    return new IdType(id.ast());
  },
  NonemptyListOf(first, _, rest) {
    return [first.ast(), ...rest.ast()];
  },
  EmptyListOf() {
    return [];
  },
  id(_1, _2) {
    return this.sourceString;
  },
  numlit(_1, _2, _3, _4, _5, _6) {
    return new NumericLiteral(+this.sourceString);
  },
  boollit(_) {
    return new BooleanLiteral(!!this.sourceString);
  },
  strlit(_1, chars, _6) {
    return new StringLiteral(this.sourceString);
  },
  _terminal() {
    return this.sourceString;
  }
});
/* eslint-enable no-unused-vars */

module.exports = text => {
  const match = grammar.match(withIndentsAndDedents(text));
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return astGenerator(match).ast();
};