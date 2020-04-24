const parse = require('../../syntax/parser');
const generate = require('../../backend/javascript-generator');
const Context = require("../../semantics/context");

const fixture = {
  binary: [
    String.raw`2 <= 5!!!
4 != 12!!!
trueShit && trueShit!!!
"hello" + "World"!!!
2 + 10!!!
(9 / 3) + ((2 * 6) % 4) - 1!!!`,
    String.raw`(2 <= 5);
(4 != 12);
(true && true);
("hello" + "World");
(2 + 10);
(((9 / 3) + ((2 * 6) % 4)) - 1);`,
  ],

//   unary: [
//     String.raw`-2!!! +2!!! BANGENERGY trueShit!!!`,
//     String.raw`(-2);
//     (+2);
//     false;`
//   ],

  variables: [
      String.raw`digitz x: 10!!!
      wordz y: "hello!"!!!
      boolz t: fraudulentAssBitch!!!`,
      /let x_(\d+) = 10;\s*let y_(\d+) = "hello!";\s*let t_(\d+) = false;/
  ],

  whileLoopWithBreak: [
    String.raw`wylin🤪 trueShit  $
    GTFO💩!!!
  #`,
    /while \(true\) \{\s*break;\s*\};/,
  ],

//   forLoop: [
//     String.raw`
//   openHerUp🍑 digitz i: 0 🔥 i <= 10 🔥 i++ $
//   supLilBitch "Hi Toal :)"!!!
// #
//   `,
//     /for \(let i_(\d+) = 0; i_\1 <= 10; i_\1 \+= 1\) \{\s*console.log\("Hi Toal :\)"\);\s*\};/,
//   ],

  array: [
    String.raw`
    arrayz<digitz> g : [1,2,3]!!!
  `,
    /let g_(\d+) = \[\s*1,\s*2,\s*3\s*\];/,
  ],

  set: [
    String.raw`
    setz <digitz> names: $1, 2, 3#!!!
  `,
    /let names_(\d+) = new Set\(\[\s*1,\s*2,\s*3\s*\]\);/,
  ],

  dict: [
    String.raw` dictz <wordz,wordz> d: $ "forney" ~ "hustler", "toal" ~ "wizard"#!!!`,
    /let d_\d+ = \{\s*forney: "hustler",\s*toal: "wizard"\s*\};/,
  ],
  
  tuple: [
    String.raw`
    tuplez<digitz, boolz> tup: (1,2,trueShit)!!!
  `,
    /let tup_(\d+) = \[\s*1,\s*2,\s*true\s*\];/,
  ],

  ifStatement: [
    String.raw`iHaveSomethingToSay🙅🏾‍♀️ 4 < 10 $
    digitz x:10!!!
    #`,
    /if \(4 < 10\) \{\s*let x_(\d+) = 10;\s*\};/,
  ],

  ifElseIfElseStatement: [
    String.raw`iHaveSomethingToSay🙅🏾‍♀️ 1 < 2 $
  1!!!
  # becauseWhyyy😼 1 > 2 $
  2!!!
  # BECAUSEIMONFUCKINGVACATION👅 $
  3!!!
  #`,
    /if \(1 < 2\) \{\s*1;\s*\} else if \(1 > 2\) \{\s*2;\s*\} else \{\s*3;\s*\};/,
  ],

  switch: [
      String.raw`
      digitz number: 0!!!
wordz day: ""!!!
shutUpGirlfriend😈 number $
  andWhatAboutIt👉 0 $
      day : "Sunday"!!!
      GTFO💩!!!
  #
  andWhatAboutIt👉 6  $
      day : "Saturday"!!!
      GTFO💩!!!
  #
  andLetMeDoMe🤑 $
      day : "Weekday"!!!
  #
#
      `,
      /let number_(\d+) = 0;\s*let day_(\d+) = "";\s*switch\(number_(1)\){case 0:\s*day_(2) = "Sunday";\s*break;\s*case 6:\s*day_(2) = "Saturday";\s*break;default:\s*day_(2) = "Weekday";\s*}/
  ],

  print: [
    String.raw`supLilBitch "hi"!!!`,
    String.raw`console.log("hi");`,
  ]
};

describe('The JavaScript generator', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct output for ${name}`, (done) => {
      const ast = parse(source);
      ast.analyze(Context.INITIAL);
      // eslint-disable-next-line no-undef
      expect(generate(ast)).toMatch(expected);
      done();
    });
  });
});