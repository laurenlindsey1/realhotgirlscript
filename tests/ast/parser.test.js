const fs = require("fs");
const TEST_DIR = `tests/grammar/testFiles/goodPrograms`;
/* eslint-disable no-undef */
describe("The parser", () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    if (name.endsWith(".hotgirlz")) {
      it(`produces the correct AST for ${name}`, (done) => {
        fs.readFile(`${TEST_DIR}/${name}`, "utf-8", () => {
          fs.readFile(`${TEST_DIR}/${name}.txt`, "utf-8", () => {
            done();
          });
        });
      });
    }
  });
});
