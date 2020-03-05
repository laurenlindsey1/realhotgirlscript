const fs = require("fs");
const assert = require("assert");
const parse = require("../../syntax/parser.js");
const TEST_DIR_GOOD = `grammar/__tests__/testFiles/goodPrograms`;
const TEST_DIR_BAD = `grammar/__tests__/testFiles/badPrograms`;
describe("The grammar", () => {
  fs.readdirSync(TEST_DIR_GOOD).forEach(name => {
    if (name.endsWith(".hotgirl")) {
      it(`matches the program ${name}`, done => {
        fs.readFile(`${TEST_DIR_GOOD}/${name}`, "utf-8", (err, input) => {
          // In this test we just care that it parses without errors
          assert.ok(parse(input));
          done();
        });
      });
    }
  });
});

describe("The grammar", () => {
  fs.readdirSync(TEST_DIR_BAD).forEach(name => {
    if (name.endsWith(".error")) {
      it(`detects a syntax error in ${name}`, done => {
        fs.readFile(`${TEST_DIR_BAD}/${name}`, "utf-8", (err, input) => {
          // We always wrap Ohm failures in an error with text "Syntax Error"
          assert.throws(() => parse(input), /Syntax Error/);
          done();
        });
      });
    }
  });
});
