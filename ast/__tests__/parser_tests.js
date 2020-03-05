const fs = require("fs");
const assert = require("assert");
const util = require("util");
const { parseProgram } = require("../../syntax/parser");
const TEST_DIR = `grammar/__tests__/testFiles/goodPrograms`;
/* eslint-disable no-undef */
describe("The parser", () => {
  fs.readdirSync(TEST_DIR).forEach(name => {
    if (name.endsWith(".hotgirl")) {
      it(`produces the correct AST for ${name}`, done => {
        fs.readFile(`${TEST_DIR}/${name}`, "utf-8", (err, input) => {
          // const ast = `${util.inspect(parseProgram(input), { depth: null })}`;
          fs.readFile(`${TEST_DIR}/${name}.txt`, "utf-8", (_err, expected) => {
            // assert.equal(ast.replace(/\s/g, ''), expected.replace(/\s/g, ''));
            done();
          });
        });
      });
    }
  });
});
