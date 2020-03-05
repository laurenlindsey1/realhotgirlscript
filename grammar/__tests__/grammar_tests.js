/*
 * Grammar Success Test
 *
 * These tests check that our grammar accepts a program that features all of
 * syntactic forms of the language.
 */

const syntaxCheck = require("../syntax-checker");

const program = String.raw`1+2*3!!!`;

describe("The syntax checker", () => {
  test("accepts the mega program with all syntactic forms", done => {
    expect(syntaxCheck(program)).toBe(true);
    done();
  });
});
