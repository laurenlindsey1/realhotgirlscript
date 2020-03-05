const fs = require("fs");
const assert = require("assert");
const parse = require("../../syntax/parser.js");
const TEST_DIR = `grammar/__tests__/testFiles/goodPrograms`;
describe("The grammar", () => {
  fs.readdirSync(TEST_DIR).forEach(name => {
    if (name.endsWith(".hotgirl")) {
      it(`matches the program ${name}`, done => {
        fs.readFile(`${TEST_DIR}/${name}`, "utf-8", (err, input) => {
          // In this test we just care that it parses without errors
          assert.ok(parse(input));
          done();
        });
      });
    }
  });
});
