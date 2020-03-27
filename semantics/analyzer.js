const {
    ArrayExpression,
    ArrayType,
    AssignmentStatement,
    BinaryExpression,
    Block,
    BooleanType,
    BreakStatement,
    Call,
    ClassDeclaration,
    Closure,
    ContinueStatement,
    DictExpression,
    DictType,
    FunctionDeclaration,
    IfStatement,
    LongType,
    NumType,
    Loop,
    NumericLiteral,
    Optional,
    Print,
    Program,
    ReturnStatement,
    DefaultCase,
    SetExpression,
    SetType,
    SwitchStatement,
    SimpleStmt_call,
    TupleType,
    TupleExpression,
    UnaryExpression,
    VariableDeclaration,
    WhileStatement,
    Case,
    KeValueExpression,
    SubscriptedExpression,
    IdentifierExpression,
    IdentifierDeclaration,
    Parameter,
    Argument,
    StringLiteral,
    BooleanLiteral,
    IdType,
    PrintStatement,
    Fraction,
    Exponent
  } = require('../ast');
  const { IntType, LongType, StringType, ConstType, BoolType, NoneType } = require('./builtins'); //standard functions?
  const check = require('./check');
  const Context = require('./context');
  
  module.exports = function(exp) {
    exp.analyze(Context.INITIAL);
  };

  //  constructor(type, id, expression) {
  Arugment.prototype.analyze = function(context) {
    this.type = context.lookup(this.type);
    // check.isArrayType(this.type);
    //TODO: we aren't sure on this one
    // this.size.analyze(context);
    // check.isInteger(this.size);
    // this.fill.analyze(context);
    // check.isAssignableTo(this.fill, this.type.memberType);
  };
  
  ArrayExpression.prototype.analyze = function(context) {
    this.expression.analyze(context);
    check.isArray(this.expression);
  };
  
  ArrayType.prototype.analyze = function(context) {
    this.arr.analyze(context);
    check.isArrayType(this.arr);
    //got from goof?
    this.type = getType(this.type);
    // check.isArrayType(this.arr);

  };
  
  AssignmentStatement.prototype.analyze = function(context) {
    this.source.analyze(context);
    this.target.analyze(context);
    check.isAssignableTo(this.source, this.target.type);
    check.isNotConstant(this.target);
  };

  BinaryExpression.prototype.analyze = function(context) {
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

  Block.prototype.analyze = function(context) {
    this.statements.analyze(statements);
    this.statements.forEach(s => s.analyze(context));
    check.isStatement(this.statements);
  };

  BooleanLiteral.prototype.analyze = function() {
      if (typeof this.value === 'boolean') {
        this.type = BooleanType;
      } 
  };

  BreakStatement.prototype.analyze = function(context) {
    check.inLoop(context, 'GTFO💩');
  };
  
  //call statement?
  Call.prototype.analyze = function(context) {
    this.id = context.lookup(this.id);
    check.isFunction(this.id, 'Attempt to call a non-function');
    this.args.forEach(arg => arg.analyze(context));
    check.legalArguments(this.args, this.callee.params);
  };

  Case.prototype.analyze = function(context) {
    this.expression = context.lookup(this.expression);
    check.isBoolean(this.expression, 'Expression for switch statement case');
    this.body = context.lookup(this.body);
    check.isBlock(this.body, 'Case body contains a non-statement');
  };

  //update class with analyze signature! see function declaration
  ClassDeclaration.prototype.analyze = function(context) {
    this.id = context.lookup(this.id);
    //TODO: this is not going to work
    check.fieldHasNotBeenUsed(this.id, usedFields);
    this.params = context.lookup(this.params);
    this.params.forEach(p => {
      p.analyze(this.bodyContext);
      check.isParam(this.params);
    });
    this.body = context.lookup(this.body);
    check.isBlock(this.body, 'Class declaration does not contain block');
  };

  //TODO: ???
  Closure.prototype.analyze = function(context) {

  };

  ContinueStatement.prototype.analyze = function(context) {
    check.inLoop(context, 'keepItPushin');
  };

  DefaultCase.prototype.analyze = function(context) {
    this.body = context.lookup(this.body);
    check.isBlock(this.body, 'Default case body contains a non-statement');
  };

  DictExpression.prototype.analyze = function(context) {
    this.expression.analyze(context);
    check.isDictionary(this.expression);

  };
  
  DictType.prototype.analyze = function(context) {
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

  Exponent.prototype.analyze = function(context) {
    this.lettere.analyze(context);
    check.isE(this.lettere);
    this.sign.analyze(context);
    check.isValidSign(this.sign);
    this.digit.analyze(context);
    check.isIntegerOrLong(this.digit);
  };

  Fraction.prototype.analyze = function(context) {
    this.digit.analyze(context);
    check.isIntegerOrLong(this.digit);
  };

   // Function analysis is broken up into two parts in order to support (nutual)
  // recursion. First we have to do semantic analysis just on the signature
  // (including the return type). This is so other functions that may be declared
  // before this one have calls to this one checked.
  FunctionDeclaration.prototype.analyzeSignature = function(context) {
    this.body = context.createChildContextForFunctionBody();
    this.params.forEach(p => p.analyze(this.body));
    this.type = !this.type ? undefined : context.lookup(this.type);
  };
  
  FunctionDeclaration.prototype.analyze = function() {
    this.body.analyze(this.body);
    check.isAssignableTo(this.body, this.type, 'Type mismatch in function return');
    delete this.body; // This was only temporary, delete to keep output clean.
  };

  //id type vs id expression vs id declaration???
  IdType.prototype.analyze = function(context){
    this.id.analyze(this.id);
    check.isValidType(this.id);
  }

  //not sure about this one either
  IfStatement.prototype.analyze = function(context) {
    this.cases.analyze(context);
    this.cases.forEach(c => {
      c.analyze(context);
      check.isBoolean(this.c, 'If statement is not a boolean');
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
  

  // STOPPED AT IF STATEMENT.JS 

  ClassicForLoop.prototype.analyze = function(context) {
    this.type = context.lookup(this.type);
    this.initexpression.analyze(context); //analyze assigns a type
    check.isAssignableTo(this.initexpression, this.type);
    this.testExpression.analyze(context);
    check.isBoolean(this.testExpression, 'Condition in for');
    variableToIncrement = context.lookup(updateid);
    check.isIntegerOrLong(variableToIncrement, 'Increment in for');
    const bodyContext = context.createChildContextForLoop();
    this.index = new Variable(this.initId, this.initexpression.type);
    this.index.constant = true;
    bodyContext.add(this.index);
    this.body.analyze(bodyContext);
  };
  

  LetExp.prototype.analyze = function(context) {
    const newContext = context.createChildContextForBlock();
    this.decs.filter(d => d.constructor === TypeDec).map(d => newContext.add(d));
    this.decs.filter(d => d.constructor === Func).map(d => d.analyzeSignature(newContext));
    this.decs.filter(d => d.constructor === Func).map(d => newContext.add(d));
    this.decs.map(d => d.analyze(newContext));
    check.noRecursiveTypeCyclesWithoutRecordTypes(this.decs);
    this.body.map(e => e.analyze(newContext));
    if (this.body.length > 0) {
      this.type = this.body[this.body.length - 1].type;
    }
  };
  
  Literal.prototype.analyze = function() {
    if (typeof this.value === 'number') {
      this.type = IntType;
    } else {
      this.type = StringType;
    }
  };
  
  MemberExp.prototype.analyze = function(context) {
    this.record.analyze(context);
    check.isRecord(this.record);
    const field = this.record.type.getFieldForId(this.id);
    this.type = field.type;
  };
  
  NegationExp.prototype.analyze = function(context) {
    this.operand.analyze(context);
    check.isInteger(this.operand, 'Operand of negation');
    this.type = IntType;
  };
  
  Nil.prototype.analyze = function() {
    this.type = NilType;
  };
  
  Param.prototype.analyze = function(context) {
    this.type = context.lookup(this.type);
    context.add(this);
  };
  
  RecordExp.prototype.analyze = function(context) {
    this.type = context.lookup(this.type);
    check.isRecordType(this.type);
    this.bindings.forEach(binding => {
      const field = this.type.getFieldForId(binding.id);
      binding.analyze(context);
      check.isAssignableTo(binding.value, field.type);
    });
  };
  
  RecordType.prototype.analyze = function(context) {
    const usedFields = new Set();
    this.fields.forEach(field => {
      check.fieldHasNotBeenUsed(field.id, usedFields);
      usedFields.add(field.id);
      field.analyze(context);
    });
  };
  
  RecordType.prototype.getFieldForId = function(id) {
    const field = this.fields.find(f => f.id === id);
    if (!field) {
      throw new Error('No such field');
    }
    return field;
  };
  
  SubscriptedExp.prototype.analyze = function(context) {
    this.array.analyze(context);
    check.isArray(this.array);
    this.subscript.analyze(context);
    check.isInteger(this.subscript);
    this.type = this.array.type.memberType;
  };
  
  TypeDec.prototype.analyze = function(context) {
    this.type.analyze(context);
  };
  
  Variable.prototype.analyze = function(context) {
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
  
  WhileStatement.prototype.analyze = function(context) {
    this.expression.analyze(context);
    check.isBoolean(this.expression, 'Condition in while');
    this.body.analyze(context.createChildContextForLoop());
  };