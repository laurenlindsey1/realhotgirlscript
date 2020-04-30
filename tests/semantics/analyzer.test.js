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
  "arg-call-wrong-type": "Type mismatch",
  "arrayz-improper": "Type mismatch",
  "break-outside-loop": "Break outside of loop",
  "call-not-function": "Not callable",
  "dictz-wrong": "Type mismatch",
  "digitz-plus-wordz": "Cannot concatenate unless string or integer",
  "function-call-with-incorrect-args": "Expected 3 args in call, got 2",
  "function-no-return": "Missing return statement",
  "if-not-boolz": "Not a boolean",
  "incompatible-func-return-types": "Type mismatch",
  "incorrect-binary-exp": "Type mismatch",
  "incorrect-reassignments": "Type mismatch",
  "loop-error": "Type mismatch",
  "member-expression-illegal": "Has no member expression",
  "mismatched-assignment-length": "Incorrect number of arguments",
  "return-outside-of-function": "Not inside a function",
  "reused-var-declaration": "Identifier already declared in this scope",
  "setz-assigned-to-boolz": "Type mismatch",
  "setz-improper": "Type mismatch",
  "stayz-reassignment": "Assignment to constant variable",
  "subscripted-nan": "Not an integer",
  "subscripted-wrong-type": "Not subscriptable",
  "tuplez-improper": "Type mismatch",
  "unary-expression": "Type mismatch",
  "unary-wrong-type": "Not a boolean",
  "var-incorrect-type-reassignment": "Type mismatch",
  "var-not-declared": "Identifier count has not been declared",
  "var-out-of-function-scope": "Identifier message has not been declared",
  "var-redeclared-in-function": "Identifier already declared in this scope",
  "void-function-with-return": "Void functions cannot have return statements",
  "wordz-assigned-to-digitz": "Type mismatch",
};

describe("The semantic analyzer", () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith(".error")) {
      test(`detected in ${name}`, (done) => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
        const errorPattern = errors[name.slice(0, name.length - 6)];
        // eslint-disable-next-line no-undef
        expect(() =>
          program.analyze(Context.INITIAL.createChildContextForBlock())
        ).toThrow(errorPattern);
        done();
      });
    } else if (name.endsWith(".hotgirl")) {
      test(`should analyze ${name} without errors`, (done) => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
        program.analyze(Context.INITIAL.createChildContextForBlock());
        done();
      });
    }
  });
});
