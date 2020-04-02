/*
 * Semantic Analysis Tests
 *
 * Tests that the semantic analysis phase decorates the AST as expected for
 * semantically correct programs, and enforces static semantic rules by
 * throwing the expected errors.
 */

const fs = require("fs");
const parse = require("../../syntax/parser");
const Context = require("../../semantics/context");

const errors = {
  "arg-call-wrong-type": "Argument and parameter types do not match",
  "break-outside-loop": "Break outside of loop",
  "call-not-function": "Call is not a function",
  "dictz-wrong": "Types are not compatible",
  "digitz-plus-wordz": "Types are not compatible",
  "function-call-with-incorrect-args": "Incorrect function call",
  "function-no-return": "Missing return statement",
  "if-else-repeat": "Incorrect if/else usage",
  "if-not-boolz": "Types are not compatible",
  "incompatible-func-return-types": "Types are not compatible",
  "incorrect-binary-exp": "Cannot be used in a binary expression",
  "incorrect-reassignments": "Types are not compatible",
  "loop-error": "Types are not compatible",
  "mismatched-assignment-length": "Incorrect number of arguments",
  "return-outside-of-function": "Return statement not in function",
  "reused-var-declaration": "Identifier already declared in this scope",
  "setz-assigned-to-boolz": "Types are not compatible",
  "setz-improper": "Types are not compatible",
  "stayz-reassignment": "Cannot reassign to constant value",
  "subscripted-nan": "Types are not compatible",
  "subscripted-wrong-type": "Not an array or dictionary or set",
  "unary-wrong-type": "Not a number",
  "var-incorrect-type-reassignment": "Types are not compatible",
  "var-not-declared": "Variable has not been declared",
  "var-redeclared-in-function": "Identifier already declared in this scope",
  "void-function-with-return": "Void functions cannot have return statements",
  "wordz-assigned-to-digitz": "Types are not compatible"
};

describe("The semantic analyzer", () => {
  fs.readdirSync(__dirname).forEach(name => {
    if (name.endsWith(".error")) {
      test(`detected in ${name}`, done => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
        const errorPattern = errors[name.slice(0, name.length - 6)];
        // eslint-disable-next-line no-undef
        expect(() =>
          program.analyze(Context.INITIAL.createChildContextForBlock())
        ).toThrow(errorPattern);
        done();
      });
    } else if (name.endsWith(".hotgirl")) {
      test(`should analyze ${name} without errors`, done => {
        // For now, we are happy to know that these files pass semantic analysis.
        // We eventually need to check that the ASTs are properly decorated.
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
        program.analyze(Context.INITIAL.createChildContextForBlock());
        done();
      });
    }
  });
});
