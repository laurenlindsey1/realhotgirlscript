/*
 * Semantic Analysis Context
 *
 * A context object holds state for the semantic analysis phase.
 *
 *   const Context = require('./semantics/context');
 */

// const { TypeDec } = require("../ast");
const {
  standardFunctions,
  IntType,
  LongType,
  StringType,
  ConstType,
  BoolType,
  NoneType
} = require("./builtins");

require("./analyzer");

// When doing semantic analysis we pass around context objects.
//
// A context object holds:
//
//   1. A reference to the parent context (or null if this is the root context).
//      This allows to search for declarations from the current context outward.
//
//   2. A reference to the current function we are analyzing, if any. If we are
//      inside a function, then return expressions are legal, and we will be
//      able to type check them.
//
//   3. Whether we are in a loop (to know that a `break` is okay).
//
//   4. A map for looking up all identifiers declared in this context.

class Context {
  constructor({ parent = null, currentFunction = null, inLoop = false } = {}) {
    Object.assign(this, {
      parent,
      currentFunction,
      inLoop,
      declarations: Object.create(null)
      // declarations: new Map()
    });
  }

  createChildContextForFunctionBody(currentFunction) {
    // When entering a new function, we're not in a loop anymore
    return new Context({ parent: this, currentFunction, inLoop: false });
  }

  createChildContextForLoop() {
    // When entering a loop body, just set the inLoop field, retain others
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: true
    });
  }

  createChildContextForBlock() {
    // For a block, we have to retain both the function and loop settings.
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: this.inLoop
    });
  }

  // Adds a declaration to this context.
  //take in type and id
  add(entity, id) {
    if ((id || entity.id) in this.declarations) {
      throw new Error(`${id} already declared in this scope`);
    }
    this.declarations[id || entity.id] = entity;
  }

  // from Scriptofino
  // add(entity) {
  //   if (entity.id in this.declarations) {
  //     throw new Error(`${entity.id} already declared in scope`);
  //   }
  //   this.declarations[entity.id] = entity;
  // }

  // from Tiger
  // add(declaration) {
  //   if (this.declarations.has(declaration.id)) {
  //     //possibly check if it has the same type as well, because we can have same name, diff type
  //     throw new Error(`${declaration.id} already declared in this scope`);
  //   }
  //   const entity =
  //     declaration instanceof TypeDec ? declaration.type : declaration;
  //   this.declarations.set(declaration.id, entity);
  // }

  // Returns the entity bound to the given identifier, starting from this
  // context and searching "outward" through enclosing contexts if necessary.
  lookup(id) {
    for (let context = this; context !== null; context = context.parent) {
      if (context.declarations.has(id)) {
        return context.declarations.get(id);
      }
    }
    throw new Error(`Identifier ${id} has not been declared`);
  }
}

Context.INITIAL = new Context();
[IntType, LongType, StringType, ConstType, BoolType, NoneType, ...standardFunctions].forEach(entity => {
  print(`HERE ${this.declarations}!!!!!\n`);
  // THIS IS WHERE THE 'undefined already declared in this scope' ERROR IS COMING FROM
  Context.INITIAL.add(entity);
});

module.exports = Context;
