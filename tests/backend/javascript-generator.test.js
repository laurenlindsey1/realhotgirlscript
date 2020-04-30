const parse = require("../../syntax/parser");
const generate = require("../../backend/javascript-generator");
const Context = require("../../semantics/context");

const fixture = {
  letandassign: [
    String.raw`digitz x: 5 !!! x: 9!!!`,
    /let x_(\d+) = 5;\s*x_\1 = 9;/,
  ],

  argument: [
    String.raw`weOutHereTryinToFunction leftOnRead yourName(wordz name) $
            supLilBitch "my name is " + name !!!
          #
          yourName(name: "lauren") !!!`,
    /function yourName_(\d+)\(name_(\d+)\) {\s*console.log\(\("my name is " \+ name_\2\)\);\s*\};\s*yourName_\1\("lauren"\);/,
  ],

  class: [
    String.raw`ATTENTIONATTENTION🗣 fakeAssBitches () $
        wordz worstQuality: "Being redundant and centrally irrelevant"!!!
      #
      fakeAssBitches b: fakeAssBitches()!!!
      supLilBitch b.worstQuality!!!`,
    /class fakeAssBitches_(\d+)\(\) {\s*let worstQuality_(\d+) = "Being redundant and centrally irrelevant";\s*};\s*let b_(\d+) = new fakeAssBitches_(\1)\(\);\s*console.log\(b_(\3).worstQuality\);/,
  ],


  binary: [
    String.raw`2 <= 5!!!
        4 != 12!!!
        trueShit && trueShit!!!
        "hello" + "World"!!!
        2 + 10!!!
        (9 / 3) + ((2 * 6) % 4) - 1!!!`,
    /\s*\(\s*2\s*<=\s*5\s*\);\s*\(\s*4\s*!==\s*12\s*\);\s*\(\s*true\s*&&\s*true\s*\);\s*\(\s*"hello"\s*\+\s*"World"\s*\);\s*\(\s*2\s*\+\s*10\s*\);\s*\(\s*\(\s*\(\s*9\s*\/\s*3\s*\)\s*\+\s*\(\s*\(\s*2\s*\*\s*6\s*\)\s*%\s*4\s*\)\s*\)\s*-\s*1\s*\);\s*/,
  ],

  unary: [
    String.raw`-2!!!
          +2!!!
          BANGENERGY trueShit!!!`,
    /\s*\(\s*-2\s*\);\s*\(\s*\+2\s*\);\s*\(\s*!true\s*\);\s*/,
  ],

  variables: [
    String.raw`digitz z: 10!!!
              wordz y: "hello!"!!!
              boolz t: fraudulentAssBitch!!!`,
    /let z_(\d+) = 10;\s*let y_(\d+) = "hello!";\s*let t_(\d+) = false;/,
  ],

  whileLoopWithBreak: [
    String.raw`wylin🤪 trueShit  $
              GTFO💩!!!
            #`,
    /while \(true\) \{\s*break;\s*\};/,
  ],

  forLoop: [
    String.raw`
          openHerUp🍑 digitz i: 0 🔥 i <= 10 🔥 i++ $
          supLilBitch "Hi Toal :)"!!!
          keepItPushin !!!
        #
          `,
    /for \(let i_(\d+) = 0; i_\1 <= 10; i_\1 \+\+\) \{\s*console.log\("Hi Toal :\)"\);\s*continue;\s*\};/,
  ],

  spreadForLoop: [
    String.raw`
      openHerUp🍑 [0 spreadThatThang🍯 10] $
      supLilBitch "We love spreads"!!!
    #
    `,
    /let min_(\d+) = 0;\s*let max_(\d+) = 10;\s*for \(let i = min_(\1); i <= max_(\2); i\s*\+\+\) \{\s*console.log\("We love spreads"\);\s*\}/,
  ],

  array: [
    String.raw`
          arrayz<digitz> g : [1,2,3]!!!
          supLilBitch g[0]!!!
        `,
    /let g_(\d+) = \[\s*1,\s*2,\s*3\s*\];\s*console.log\(g_(\1)\[0\]\);/,
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
    /let number_(\d+) = 0;\s*let day_(\d+) = "";\s*switch \(number_(\1)\) {\s*case 0:\s*day_(\2) = "Sunday";\s*break;\s*case 6:\s*day_(\2) = "Saturday";\s*break;\s*default:\s*day_(\2) = "Weekday";\s*};\s*/,
  ],

  print: [String.raw`supLilBitch "hi"!!!`, /\s*console.log\("hi"\);\s*/],
};

describe("The JavaScript generator", () => {
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
