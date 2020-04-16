/*
 * Semantic Analysis Context
 *
 * A context object holds state for the semantic analysis phase.
 *
 *   const Context = require('./semantics/context');
 */

const util = require("util");

const {
  standardFunctions,
  IntType,
  LongType,
  StringType,
  BoolType,
  NoneType,
} = require("./builtins");

require("./analyzer");

class Context {
  constructor({
    parent = null,
    currentFunction = null,
    inLoop = false,
    inSwitch = false,
  } = {}) {
    Object.assign(this, {
      parent,
      currentFunction,
      inLoop,
      inSwitch,
      variableDeclarations: new Map(),
    });
  }

  createChildContextForFunctionBody(currentFunction) {
    return new Context({ parent: this, currentFunction, inLoop: false });
  }

  createChildContextForLoop() {
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: true,
      inSwitch: this.inSwitch,
    });
  }

  createChildContextForSwitch() {
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: this.inLoop,
      inSwitch: true,
    });
  }

  createChildContextForBlock() {
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: this.inLoop,
      inSwitch: this.inSwitch,
    });
  }

  add(id, entity) {
    if (this.variableDeclarations.has(id)) {
      throw new Error(`Identifier already declared in this scope`);
    }
    this.variableDeclarations.set(id, entity);
  }

  lookup(id) {
    for (let context = this; context !== null; context = context.parent) {
      if (context.variableDeclarations.has(id)) {
        return context.variableDeclarations.get(id);
      }
    }
    throw new Error(`Identifier ${id} has not been declared`);
  }
}

Context.INITIAL = new Context();
standardFunctions.forEach((f) => {
  Context.INITIAL.variableDeclarations[f.id] = f;
});

module.exports = Context;
