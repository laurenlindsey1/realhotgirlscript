/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const prettyJs = require("pretty-js");
const util = require("util");

const Argument = require("../ast/argument");
const ArrayExpression = require("../ast/array-expression");
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
const StringLiteral = require("../ast/string-literal");
const SubscriptedExpression = require("../ast/subscripted-expression");
const SwitchStatement = require("../ast/switch-statement");
const CallStatement = require("../ast/call-statement");
const TupleExpression = require("../ast/tuple-expression");
const UnaryExpression = require("../ast/unary-expression");
const VariableDeclaration = require("../ast/variable-declaration");
const VariableExpression = require("../ast/variable-expression");
const Variable = require("../ast/variable");
const WhileStatement = require("../ast/while-statement");

const Context = require("../semantics/context");

function makeOp(op) {
  return (
    //not sure if we need more of these, like for < etc.
    { "BANGENERGY": "!", "-": "-", "+": "+", "&&": "&&", "||": "||", "==": "===", "!=": "!=" }[op]
    || op
  );
}

const jsName = (() => {
  let lastId = 0;
  const map = new Map();
  return v => {
    if (!map.has(v)) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
  };
})();

function generateBlock(block) {
  return block.map(s => `${s.gen()};`).join("");
}

module.exports = function (exp) {
  return prettyJs(generateBlock(exp.statements), { indent: "  " });
};

Argument.prototype.gen = function () {
  return this.expression.gen();
};

ArrayExpression.prototype.gen = function () {
  const jsMembers = this.expressions.map(expressions => expressions.gen());
  return `[${jsMembers.join(",")}]`;
};

AssignmentStatement.prototype.gen = function () { //not working
  console.log("in assignment");
  //from casper
  // const formattedIds = [];
  // const exps = this.source.map(v => v.gen());
  // for (let i = 0; i < this.target.length; i += 1) {
  //   formattedIds.push(`${this.target[i].gen()} = ${exps[i]}`);
  // }
  // return `${formattedIds.join(", ")}`;

  //poss add brackets
  const targets = this.target.map(t => t.gen());
  const sources = this.source.map(s => s.gen());
  console.log(`targets ${util.inspect(targets)}`);
  console.log(`sources ${util.inspect(sources)}`);
  return `${targets} = ${sources}`;
};

BinaryExpression.prototype.gen = function () {
  return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
};

Block.prototype.gen = function () {
  if (this.statements) {
    if (Array.isArray(this.statements)) {
      const statements = this.statements.map((s) => s.gen());
      return `${statements.join(';')};`;
    }
    return `${this.statements.gen()}`;
  }
  return '';
};

BooleanLiteral.prototype.gen = function () {
  if (this.value === 'trueShit') {
    return 'true';
  }
  return 'false';
};

BreakStatement.prototype.gen = function () {
  return "break";
};

Call.prototype.gen = function () {
};

CallStatement.prototype.gen = function () {
};

Case.prototype.gen = function () {
  console.log("AM I HERE?\n");
  console.log(`EXP IS: ${util.inspect(this.expression)}`);
  console.log(`BODY IS: ${util.inspect(this.body)}`);
  const exp = this.expression.gen();
  const body = this.body.gen();
  return `case ${exp}: ${body}`;
};

ClassDeclaration.prototype.gen = function () {
};

//type,
// initId,
// initexpression,
// testExpression,
// updateid,
// incop,
// body
ClassicForLoop.prototype.gen = function () {
  const i = jsName(this.initId);
  const low = this.initexpression.gen();
  const test = this.testExpression.gen();
  // const preAssign = `let ${this.initId} = ${this.initId.gen()};`;
  const loopControl = `for (let ${i} = ${low}; ${test}; ${this.updateid}${this.incop})`;
  const body = this.body.gen();
  // return `${preAssign} ${loopControl} {${body}}`;
  return `${loopControl} {${body}}`;

};

ContinueStatement.prototype.gen = function () {
  return "continue";
};

DefaultCase.prototype.gen = function () {
  return `default: ${this.body}`
};

DictExpression.prototype.gen = function () {
  const formattedKeyValues = [];
  const keyValues = this.expressions.map(kv => kv.gen());
  for (let i = 0; i < this.expressions.length; i += 1) {
    formattedKeyValues.push(keyValues[i]);
  }
  return `{ ${formattedKeyValues.join(", ")} }`;
};

FunctionDeclaration.prototype.gen = function () {
};

IdType.prototype.gen = function () {
  return jsName(this.id);

};

IdentifierDeclaration.prototype.gen = function () {
  console.log("in id dec");
  return jsName(this.id);
};

IdentifierExpression.prototype.gen = function () {
  // return jsName(this.id);
  return this.ref.gen(); 


};

IfStatement.prototype.gen = function () {
  const cases = this.tests.map((test, index) => {
    const prefix = index === 0 ? "if" : "} else if";
    return `${prefix} ${test.gen()} {${
      this.consequents[index].gen()}`;
  });
  const alternate = this.alternate
    ? `}else{${this.alternate.gen()}`
    : "";
  return `${cases.join("")}${alternate}}`;
};

KeyValueExpression.prototype.gen = function () {
  return `${this.key.value}: ${this.value.value}`;
};

MemberExpression.prototype.gen = function () {
  return `${this.varexp.gen()}.${this.member}`;
};

NoneLiteral.prototype.gen = function () {
  return `${this.value}`;
};

NumericLiteral.prototype.gen = function () {
  return `${this.value}`;
};

Parameter.prototype.gen = function () {
};

PrintStatement.prototype.gen = function () {
  return `console.log(${this.expression.expression.gen()})`;
}

Program.prototype.gen = function () {
}

ReturnStatement.prototype.gen = function () {
  return `return ${this.expression.gen()}`;
};

SetExpression.prototype.gen = function () {
  const jsMembers = this.expressions.map(expression => expression.gen());
  return `new Set([${jsMembers}])`;
};

StringLiteral.prototype.gen = function () {
  return `${this.value}`;
};

SpreadForLoop.prototype.gen = function () {
};

SubscriptedExpression.prototype.gen = function () {
  const base = this.varexp.gen();
  const subscript = this.subscript.gen();
  return `${base}[${subscript}]`;
};

SwitchStatement.prototype.gen = function () {
  const cases = this.cases.forEach((c) => {
    c.gen();
  });
  const alternate = this.alternate.gen();
  return `switch(${this.expression} { ${cases.join("")}${alternate}}`;
};

TupleExpression.prototype.gen = function () {
  const jsMembers = this.expressions.map(expressions => expressions.gen());
  return `[${jsMembers.join(",")}]`;
};

UnaryExpression.prototype.gen = function () {
  return `(${makeOp(this.op)} ${this.operand.gen()})`;
};

Variable.prototype.gen = function () {
  console.log("In variable");
  const id = this.id.id === undefined ? this : this.id;
  return `${jsName(id)}`;
};

VariableDeclaration.prototype.gen = function () {
  console.log("In var dec");
  const formattedIds = [];

  if (this.const) {
    const expressions = this.expressions.map(v => v.gen());
    for (let i = 0; i < this.ids.length; i += 1) {
      formattedIds.push(`${jsName(this.ids[i])} = ${expressions[i]}`);
    }
    return `const ${formattedIds.join(", ")}`;
  }
  const expressions = this.expressions.map(v => v.gen());
  for (let i = 0; i < this.ids.length; i += 1) {
    formattedIds.push(`${jsName(this.ids[i])} = ${expressions[i]}`);
  }
  return `let ${formattedIds.join(", ")}`;

};

VariableExpression.prototype.gen = function () {
  console.log("In varexp");
  return `let ${jsName(this)} = ${this.id.gen()}`;
};

WhileStatement.prototype.gen = function () {
  return `while (${this.expression.gen()}) { ${this.body.gen()} }`;
};
