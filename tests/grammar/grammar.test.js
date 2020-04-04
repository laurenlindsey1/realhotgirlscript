const fs = require("fs");
const assert = require("assert");
const parse = require("../../syntax/parser.js");
const TEST_DIR_GOOD = `tests/grammar/testFiles/goodPrograms`;
const TEST_DIR_BAD = `tests/grammar/testFiles/badPrograms`;
describe("The grammar", () => {
  fs.readdirSync(TEST_DIR_GOOD).forEach((name) => {
    if (name.endsWith(".hotgirl")) {
      it(`matches the program ${name}`, (done) => {
        fs.readFile(`${TEST_DIR_GOOD}/${name}`, "utf-8", (err, input) => {
          assert.ok(parse(input));
          done();
        });
      });
    }
  });
});

describe("The grammar", () => {
  fs.readdirSync(TEST_DIR_BAD).forEach((name) => {
    if (name.endsWith(".error")) {
      it(`detects a syntax error in ${name}`, (done) => {
        fs.readFile(`${TEST_DIR_BAD}/${name}`, "utf-8", (err, input) => {
          assert.throws(() => parse(input), /Syntax Error/);
          done();
        });
      });
    }
  });
});
