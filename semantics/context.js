/*
 * Semantic Analysis Context
 *
 * A context object holds state for the semantic analysis phase.
 *
 *   const Context = require('./semantics/context');
 */

const { TypeDec } = require('../ast');
const { standardFunctions, IntType, StringType, NilType } = require('./builtins');

require('./analyzer');

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


// we gotta deal with consts, let exps, and spreads!!!!!!!
// do we need an analyzer?
class Context {
  constructor({ parent = null, currentFunction = null, inLoop = false } = {}) {
    Object.assign(this, {
      parent,
      currentFunction,
      inLoop,
      locals: new Map(),
    });
  }

  createChildContextForFunctionBody(currentFunction) {
    // When entering a new function, we're not in a loop anymore
    return new Context({ parent: this, currentFunction, inLoop: false });
  }

  createChildContextForLoop() {
    // When entering a loop body, just set the inLoop field, retain others
    return new Context({ parent: this, currentFunction: this.currentFunction, inLoop: true });
  }

  createChildContextForBlock() {
    // For a block, we have to retain both the function and loop settings.
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: this.inLoop,
    });
  }

  // Adds a declaration to this context.
  add(declaration) {
    if (this.locals.has(declaration.id)) {
      throw new Error(`${declaration.id} already declared in this scope`);
    }
    const entity = declaration instanceof TypeDec ? declaration.type : declaration;
    this.locals.set(declaration.id, entity);
  }

  cannotRebindToConstantVariable(id) {
    if (this.declarations[id] && !this.declarations[id].isMutable) {
      throw new Error('Cannot rebind to constant variable');
    }
  }

  // Returns the entity bound to the given identifier, starting from this
  // context and searching "outward" through enclosing contexts if necessary.
  lookup(id) {
    for (let context = this; context !== null; context = context.parent) {
      if (context.locals.has(id)) {
        return context.locals.get(id);
      }
    }
    throw new Error(`Identifier ${id} has not been declared`);
  }
  // CASPER HAS THIS BUT WHY????
  assertInFunction(message) {
    if (!this.currentFunction) {
      throw new Error(message);
    }
  }
  // eslint-disable-next-line class-methods-use-this
  assertIsFunction(entity) {
    if (entity.constructor !== FunctionObject) {
        throw new Error(`${entity.id} is not a function`);
    }
  }
}

Context.INITIAL = new Context();
[IntType, StringType, NilType, ...standardFunctions].forEach(entity => {
  Context.INITIAL.add(entity);
});

module.exports = Context;