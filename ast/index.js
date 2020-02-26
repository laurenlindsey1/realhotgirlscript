class Program {
    constructor(statement) {
      this.statement = statement;
    }
  }

  class SimpleStatement {  //IDK
    constructor(arguments) {
        this.arguments = arguments;
    }
  }

  class ClassStatement {
      constructor(id, params, block) {
        Object.assign(this, { id, params, block });
      }
  }

  class FunctionStatement {
      constructor(type, id, params, block) {
        Object.assign(this, { type, id, params, block });
      }
  }

  class Print {
      constructor(expressions) {
          this.expressions = expressions;
      }
  }
  
  class Block {
    constructor(statements) {
      this.statements = statements;
    }
  }
  
  class VariableDeclaration {
    constructor(id, type) {
      Object.assign(this, { id, type });
    }
  }
  
  class Type {
    constructor(name) {
      this.name = name;
    }
  }
  
  const IntType = new Type('digitz');
  const BoolType = new Type('boolz');
  const LongType = new Type('longz');
  const StringType = new Type('wordz');
  const ConstType = new Type('stayz');
  
  class AssignmentStatement {
    constructor(target, source) {
      Object.assign(this, { target, source });
    }
  }
  
  class ReadStatement {
    constructor(varexps) {
      this.varexps = varexps;
    }
  }
  
  class WriteStatement {
    constructor(expressions) {
      this.expressions = expressions;
    }
  }
  
  class WhileStatement {
    constructor(condition, body) {
      Object.assign(this, { condition, body });
    }
  }

  class IfElseStatement {   // Is this right??
    constructor(condition, body) {
        Object.assign(this, { condition, body });
      }
  }

  class SwitchStatement {
      constructor(id, basecase, defaultcase) {
        Object.assign(this, { id, basecase, defaultcase });
      }
  }

  class Loop {}

  class ClassicForLoop extends Loop {
    constructor(type, id, expressions, body) {
      super();
      Object.assign(this, { type, id, expressions, body });
    }
  }

  class SpreadForLoop extends Loop {
    constructor(expressions, block) {
      super();
      Object.assign(this, { expressions, block });
    }
  }
  
  class Expression {}
  
  class BooleanLiteral extends Expression {
    constructor(value) {
      super();
      this.value = value;
    }
  }
  
  class IntegerLiteral extends Expression {
    constructor(value) {
      super();
      this.value = value;
    }
  }
  
  class VariableExpression extends Expression {
    constructor(name) {
      super();
      this.name = name;
    }
  }
  
  class UnaryExpression extends Expression {
    constructor(op, operand) {
      super();
      Object.assign(this, { op, operand });
    }
  }
  
  class BinaryExpression extends Expression {
    constructor(op, left, right) {
      super();
      Object.assign(this, { op, left, right });
    }
  }

  class Closure {
      constructor(id, expressions) {
        Object.assign(this, { id, expressions });
      }
  }

  class ArrayType {
    constructor(memberType) {
      Object.assign(this, { memberType });
    }
  }

  class SetType {
    constructor(memberType) {
        Object.assign(this, { memberType });
      }
  }

  class DictType {
    constructor(key, value) {
        Object.assign(this, { key, value });
      }
  }

  class TupleType {
    constructor(memberType) {
        Object.assign(this, { memberType });
      }
  }

  class Call {
    constructor(id, arguments) {
        Object.assign(this, { id, arguments });
      }
  }

  
  
  
  // ADD EVERYTHING
  module.exports = {
    Program,
    Block,
    VariableDeclaration,
    Type,
    IntType,
    BoolType,
    AssignmentStatement,
    ReadStatement,
    WriteStatement,
    WhileStatement,
    Expression,
    BooleanLiteral,
    IntegerLiteral,
    VariableExpression,
    UnaryExpression,
    BinaryExpression,
  };