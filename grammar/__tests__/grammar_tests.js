/*
 * Grammar Success Test
 *
 * These tests check that our grammar accepts a program that features all of
 * syntactic forms of the language.
 */

const syntaxCheck = require("../syntax-checker");

const program = String.raw`ATTENTIONATTENTION🗣 fakeAssBitches () $
wordz worstQuality: "Being redundant and centrally irrelevant"!!!
sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
    supLilBitch "I love myself"!!!
#
#
`;

describe("The syntax checker", () => {
  test("accepts the mega program with all syntactic forms", done => {
    expect(syntaxCheck(program)).toBe(true);
    done();
  });
});
