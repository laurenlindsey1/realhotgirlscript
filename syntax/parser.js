// Parser module
  const fs = require('fs');
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
const LongType = require("../ast/long-type");
const Loop = require("../ast/loop");
const NumericLiteral = require("../ast/numeric-literal");
const Optionals = require("../ast/optionals");
const Print = require("../ast/print");
const Program = require("../ast/program");
const ReadStatement = require("../ast/read-statement");
const ReturnStatement = require("../ast/return-statement");
const SetExpression = require("../ast/set-expression");
const SetType = require("../ast/set-type");
const StringType = require("../ast/string-type");
const SwitchStatement = require("../ast/switch-statement");
const SimpleStmt_call = require("../ast/simple-statement-call");
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
const Parameter = require("../ast/parameter");
const Argument = require("../ast/argument");
const IdType = require("../ast/id-type");

const grammar = ohm.grammar(fs.readFileSync("../grammar/realHotGirlScript.ohm"));

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
  },
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
  // Stmt_if(_, cases, alternate) {
  //   return new IfElseStatement(cases.ast(), arrayToNullable(alternate.ast()));
  // },
  Stmt_if(_1, firstTest, firstBlock, _2, moreTests, moreBlocks, _3, lastBlock) {
    const tests = [firstTest.ast(), ...moreTests.ast()];
    const consequents = [firstBlock.ast(), ...moreBlocks.ast()];
    const alternate = arrayToNullable(lastBlock.ast());
    return new IfStatement(tests, consequents, alternate);
  },
  Stmt_switch(_1, expression, _2, cases, body, _3) {

    return new SwitchStatement(
      expression.ast(),
      cases.ast(),
      arrayToNullable(alternate.ast())
    );
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
    return new ClassicForLoop(type.ast(), initid.ast(), initexpression.ast(), testexpression.ast(),
      updateid.ast(), incop.ast(), body.ast());
    //IS THIS RIGHT?
  },

  Stmt_forloop2(_1, _2, expression, _3, spreadop, _4, body) {
    return new SpreadForLoop(expression.ast(), spreadop.ast(), body.ast());
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

  // Call(wait, id, _1, args, _2) {
  //   return new Call(arrayToNullable(wait.ast()), id.ast(), args.ast());
  // },

  SimpleStmt_call(call) {
    return new SimpleStmt_call(call.ast());
  },

  SimpleStmt_print(expression) {
    return new Print(expression.ast());
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

  Exp5_optional(operand, _) {
    return new Expression(operand.ast()); // IS THIS RIGHT? HOW TO FIX GRAMMAR?
  },

  Exp6_increment(op, operand) {
    return new UnaryExpression(op.ast(), operand.ast());
  },

  Exp7_exponentiation(op, _, operand) {
    return new BinaryExpression(op.ast(), operand.ast()); //  DO WE NEED  A CLASS FOR
  },

  Exp8_closure(_1, id, _2, expression, _3, _4) {
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

  Param(type, id, _, expression) {
    return new Parameter(type.ast(), id.ast(), arrayToNullable(expression.ast()));
  },
  Args(type, id, _, expression) {
    return new Argument(type.ast(), id.ast(), expression.ast());
  },
  //is this right?
  Type(id) {
    return new IdType(id.ast());
  },
  NonemptyListOf(first, _, rest) {
    return [first.ast(), ...rest.ast()];
  },
  EmptyListOf() {
    return [];
  },
  id(_) {
    return this.sourceString;
  },
  //do we need arrayToNullable(x.ast())??
  numlit(sign, digits, frac, exponent) {

    return new NumericLiteral(arrayToNullable(sign.ast()), +this.sourceString,
    arrayToNullable(frac.ast()), arrayToNullable(exponent.ast()));
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

const program = parse(`[...5, ...2, 13, ...1]`);
console.log(program);
