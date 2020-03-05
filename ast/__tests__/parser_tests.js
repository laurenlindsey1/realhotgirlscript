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
/* eslint-enable no-undef */

// const {
//   ArrayExpression,
//   ArrayType,
//   AssignmentStatement,
//   BinaryExpression,
//   Block,
//   BooleanType,
//   BreakStatement,
//   Call,
//   ClassDeclaration,
//   Closure,
//   ConstType,
//   ContinueStatement,
//   DictExpression,
//   DictType,
//   FunctionDeclaration,
//   IfStatement,
//   LongType,
//   NumType,
//   Loop,
//   NumericLiteral,
//   Optional,
//   Print,
//   Program,
//   ReturnStatement,
//   DefaultCase,
//   SetExpression,
//   SetType,
//   StringType,
//   SwitchStatement,
//   SimpleStmt_call,
//   TupleType,
//   TupleExpression,
//   UnaryExpression,
//   VariableDeclaration,
//   WhileStatement,
//   Case,
//   KeValueExpression,
//   SubscriptedExpression,
//   IdentifierExpression,
//   IdentifierDeclaration,
//   Parameter,
//   Argument,
//   StringLiteral,
//   BooleanLiteral,
//   IdType,
//   PrintStatement
// } = require("../ast");

// const fixture = {
//   1: [
//     String.raw`arrayz<digitz> g : [1,2,3]!!!`,
//     new Program(new VariableDeclaration(null, new ArrayType(), Array, Array))
//   ]
//   2: [
//     String.raw`
//     sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//         supLilBitch "I love myself"!!!
//     #
//     hotlineBling💎 hiMomma()!!!
//     `
//   ],
//   3: [
//     String.raw`
//     sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//         boolz x: 10!!!
//         iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//             supLilBitch "You're less than 10 hoe"!!!
//         # becauseWhyyy😼 x == 10 $
//             supLilBitch "10s 10s ACROSS THE BOARD"!!!
//         # BECAUSEIMONFUCKINGVACATION👅 $
//             supLilBitch "You're pretty thicc if you're greater than 10"!!!
//         #
//         andThemsTheFacts "I love myself"!!!
//     #
//   `
//   ],
//   4: [
//     String.raw`
//     sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//     digitz number: 0!!!
//     wordz day: ""!!!
//     shutUpGirlfriend😈 number $
//         andWhatAboutIt👉 0 $
//             day : "Sunday"!!!
//             GTFO💩!!!
//         #
//         andWhatAboutIt👉 6  $
//             day : "Saturday"!!!
//             GTFO💩!!!
//         #
//         andLetMeDoMe🤑 $
//             day : "Weekday"!!!
//         #
//     #
//     supLilBitch "today is a " + day!!!
//     #
//   `
//   ],
//   5: [
//     String.raw`
//     ATTENTIONATTENTION🗣 fakeAssBitches () $
// 	    digitz x: 10!!!
//     #
//     `
//   ],
//   6: [
//     String.raw`
//     1+2*3!!!
//     "oh no"!!!
//     (  	123   ) !!!
//     (2+3)-2!!!
//     supLilBitch 3!!!
//     supLilBitch "hey girl" !!!
//     supLilBitch "wylin" !!!

//     stayz wordz whoIAm : "A real hot girl."!!!
//     digitz x: 10!!!
//     x: 5!!!
//     seeYa x : x * 10@ wouldntWannBeYa!!!

//     oop single line comment
//     :/ multi
//     line
//     comment
//     /:
//   `
//   ],
//   7: [
//     String.raw`
//     ATTENTIONATTENTION🗣 fakeAssBitches () $
//         wordz worstQuality: "Being redundant and centrally irrelevant"!!!
//         sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//             supLilBitch "I love myself"!!!
//         #
//     #
//   `
//   ],
//   8: [
//     String.raw`
//     ATTENTIONATTENTION🗣 fakeAssBitches () $
//         wordz worstQuality: "Being redundant and centrally irrelevant"!!!
//         sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//             boolz x: 10!!!
//             iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//                 supLilBitch "You're less than 10 hoe"!!!
//             # becauseWhyyy😼 x == 10 $
//                 supLilBitch "10s 10s ACROSS THE BOARD"!!!
//             # BECAUSEIMONFUCKINGVACATION👅 $
//                 supLilBitch "You're pretty thicc if you're greater than 10"!!!
//             #
//             supLilBitch "I love myself"!!!
//         #
//     #
//   `
//   ],
//   9: [
//     String.raw`
//     ATTENTIONATTENTION🗣fakeAssBitches () $
//         stringz worstQuality: "Being redundant and centrally irrelevant"!!!
//         sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//             boolz x: 10!!!
//             iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//                 supLilBitch "You're less than 10 hoe"!!!
//             # becauseWhyyy😼 x == 10 $
//                 supLilBitch "10s 10s ACROSS THE BOARD"!!!
//             # BECAUSEIMONFUCKINGVACATION👅 $
//                 supLilBitch "You're pretty thicc if you're greater than 10"!!!
//             #
//             supLilBitch "I love myself"!!!
//         #
//     #
//     :/ ask Toal how to do assignment for objects with the same identifier
//     fakeAssBitches x: newBootzBeeeatch✨fakeAssBitches ()!!!
//     /:
//   `
//   ],
//   10: [
//     String.raw`
//     boolz x: 10!!!
//     iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//         supLilBitch "You're less than 10 hoe"!!!
//     # becauseWhyyy😼 x == 10 $
//         supLilBitch "10s 10s ACROSS THE BOARD"!!!
//     # BECAUSEIMONFUCKINGVACATION👅 $
//         supLilBitch "You're pretty thicc if you're greater than 10"!!!
//     #
//   `
//   ],
//   11: [
//     String.raw`
//     dictz <wordz,digitz> x: $ "x"~1 #  !!!
//     dictz <wordz,wordz> stateCapitals: $ California ~ "Sacramento", Nevada ~ "Carson City", Oregon ~ "Salem"#!!!
//   `
//   ],
//   12: [
//     String.raw`
//     weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
//         openHerUp🍑 digitz i: 0 🔥 i <= onRepeat 🔥 i++ $
//             supLilBitch "I don't give a fuck"!!!
//         #
//     #
//     hiMomma()!!!
//     weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
//         openHerUp🍑 digitz i: onRepeat - 1 🔥 i >= 0 🔥 i++ $
//           supLilBitch "I love myself"!!!
//         #
//     #
//     hiMomma()!!!
//   `
//   ],
//   13: [
//     String.raw`
//     boolz x: 10!!!
//     iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//         supLilBitch "You're less than 10 hoe"!!!
//     # becauseWhyyy😼 x == 10 $
//         supLilBitch "10s 10s ACROSS THE BOARD"!!!
//     # BECAUSEIMONFUCKINGVACATION👅 $
//         supLilBitch "You're pretty thicc if you're greater than 10"!!!
//     #
//   `
//   ],
//   14: [
//     String.raw`
//     sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma(digitz x, digitz y)$
//         boolz x: 10!!!
//         iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//         supLilBitch "You're less than 10 hoe"!!!
//         # becauseWhyyy😼 x == 10 $
//         supLilBitch "10s 10s ACROSS THE BOARD"!!!
//         # BECAUSEIMONFUCKINGVACATION👅 $
//         supLilBitch "You're pretty thicc if you're greater than 10"!!!
//         #
//         supLilBitch "I love myself"!!!
//         supLilBitch x!!!
//         supLilBitch y!!!
//     #
//     hotlineBling💎 hiMomma(digitz x: 5, digitz y: 6)!!!
//   `
//   ],
//   15: [
//     String.raw`sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma(digitz x, digitz y)$
//   boolz x: 10!!!
//   iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//       supLilBitch "You're less than 10 hoe"!!!
//   # becauseWhyyy😼 x == 10 $
//       supLilBitch "10s 10s ACROSS THE BOARD"!!!
//   # BECAUSEIMONFUCKINGVACATION👅 $
//       supLilBitch "You're pretty thicc if you're greater than 10"!!!
//   #
//   supLilBitch "I love myself"!!!
//   supLilBitch x!!!
//   supLilBitch y!!!
//   #
//   hotlineBling💎 hiMomma(digitz x: 5, digitz y: 6)!!!`
//   ],
//   16: [
//     String.raw`sheWaits😩 weOutHereTryinToFunction wordz hiMomma()$
//   boolz x: 10!!!
//   iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//       supLilBitch "You're less than 10 hoe"!!!
//   # becauseWhyyy😼 x == 10 $
//       supLilBitch "10s 10s ACROSS THE BOARD"!!!
//   # BECAUSEIMONFUCKINGVACATION👅 $
//       supLilBitch "You're pretty thicc if you're greater than 10"!!!
//   #
//   andThemsTheFacts "I love myself"!!!
//   #`
//   ],
//   17: [
//     String.raw`sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//   digitz number: 0!!!
//   wordz day: ""!!!
//   shutUpGirlfriend😈 number $
//     andWhatAboutIt👉 0 $
//         day : "Sunday"!!!
//         GTFO💩!!!
//     #
//     andWhatAboutIt👉 6  $
//         day : "Saturday"!!!
//         GTFO💩!!!
//     #
//     andLetMeDoMe🤑 $
//         day : "Weekday"!!!
//     #
//   #
//   supLilBitch "today is a " + day!!!
//   #  `
//   ],
//   18: [
//     String.raw`weOutHereTryinToFunction leftOnRead hiMomma()$
//   wylin🤪 i < 10  $
//       text : text + "The number is " + i!!!
//       i++!!!
//   #
//   #`
//   ],
//   19: [
//     String.raw`weOutHereTryinToFunction leftOnRead yourName(wordz name) $
// 	supLilBitch "my name is " + name !!!
// #`
//   ],
//   20: [
//     String.raw`weOutHereTryinToFunction leftOnRead ifStatement() $
// 	iHaveSomethingToSay🙅🏾‍♀️ 1 $
//     	supLilBitch "dr toal!"!!!
//     #
// #`
//   ],
//   21: [
//     String.raw`weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
//   openHerUp🍑 [0 spreadThatThang🍯 10] $
//           supLilBitch "I don't give a fuck"!!!
//   #
// #
// oop leftOnRead()!!!`
//   ],
//   22: [
//     String.raw`weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
//   boolz likeWhiteOnRice: trueShit!!!
//   openHerUp🍑 [0 spreadThatThang🍯 10] $
//           iHaveSomethingToSay🙅🏾‍♀️ (likeWhiteOnRice)$
//               supLilBitch "I don't give a fuck"!!!
//           #
//           BECAUSEIMONFUCKINGVACATION👅$
//               GTFO💩!!!
//           #
//   #
// #
// hiMomma(digitz onRepeat: 10)!!!
// weOutHereTryinToFunction leftOnRead hiMomma1(digitz onRepeat)$
//   boolz likeWhiteOnRice: trueShit!!!
//   openHerUp🍑 [0 spreadThatThang🍯 10] $
//           iHaveSomethingToSay🙅🏾‍♀️ (likeWhiteOnRice)$
//               keepItPushin!!!
//           #
//           BECAUSEIMONFUCKINGVACATION👅$
//               supLilBitch "I don't give a fuck"!!!
//           #
//   #
// #
// hiMomma1(digitz onRepeat: 10)!!!`
//   ],
//   23: [
//     String.raw`tuplez<digitz> a : (0.2e5, 30, 40, 50)!!!
//   `
//   ],
//   24: [
//     String.raw`weOutHereTryinToFunction leftOnRead hiMomma()$
//   wylin🤪 i < 10  $
//       text: text + "The number is " + i!!!
//       i++!!!
//   #
// # `
//   ],
//   25: [
//     String.raw`sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//   boolz x: 10!!!
//   iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//       supLilBitch "You're less than 10 hoe"!!!
//   # becauseWhyyy😼 x == 10 $
//       supLilBitch "10s 10s ACROSS THE BOARD"!!!
//   # BECAUSEIMONFUCKINGVACATION👅 $
//       supLilBitch "You're pretty thicc if you're greater than 10"!!!
//   #
//   supLilBitch "I love myself"!!!
//   #`
//   ],
//   26: [
//     String.raw`1+2*3!!!
//   "oh no"!!!
//    (  	123   ) !!!
//   (2+3)-2!!!
//   weOutHereTryinToFunction arrayz<boolz> makeChange(digitz amount) $
//     supLilBitch "mynameis" !!!
//   #
//   supLilBitch 3!!!
//   supLilBitch "hey girl" !!! supLilBitch "hey girl" !!!
//   supLilBitch "wylin" !!!
//   dictz <wordz,digitz> x:  $ "x"~1 #  !!!
//   dictz <wordz,wordz> stateCapitals: $ California ~ "Sacramento", Nevada ~ "Carson City", Oregon ~ "Salem"#!!!
//   weOutHereTryinToFunction arrayz<digitz> makeChange(digitz amount) $
//     iHaveSomethingToSay🙅🏾‍♀️ 1 $
//         supLilBitch "dr toal!"!!!
//       #
//   #
//   arrayz<digitz> g : [1,2,3]!!!
//   digitz x: 10!!!
//   x: 5!!!
//   oop I checked that setting x to a non-digitz type threw an error so we can a test for that
//   :/
//   yes yes yes
//   yes
//   yeah
//   /:
//   ATTENTIONATTENTION🗣 fakeAssBitches () $
//     digitz x: 10!!!
//   #
//   boolz x: 10!!!
//    iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//       supLilBitch "You're less than 10 hoe"!!!
//    # becauseWhyyy😼 x == 10 $
//       supLilBitch "10s 10s ACROSS THE BOARD"!!!
//    # BECAUSEIMONFUCKINGVACATION👅 $
//        supLilBitch "You're pretty thicc if you're greater than 10"!!!
//    #
//    weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
//       openHerUp🍑 digitz i: 0 🔥 i <= onRepeat 🔥 i++ $
//               supLilBitch "I don't give a fuck"!!!
//       #
//   #
//   hiMomma()!!!
//   weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
//       openHerUp🍑 digitz i: onRepeat - 1 🔥 i >= 0 🔥 i++ $
//               supLilBitch "I love myself"!!!
//       #
//   #
//   hiMomma()!!!
//   ATTENTIONATTENTION🗣 fakeAssBitches () $
//       wordz worstQuality: "Being redundant and centrally irrelevant"!!!
//       sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//           supLilBitch "I love myself"!!!
//       #
//   #
//   ATTENTIONATTENTION🗣 fakeAssBitches () $
//       wordz worstQuality: "Being redundant and centrally irrelevant"!!!
//       sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//           boolz x: 10!!!
//           iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//               supLilBitch "You're less than 10 hoe"!!!
//           # becauseWhyyy😼 x == 10 $
//               supLilBitch "10s 10s ACROSS THE BOARD"!!!
//           # BECAUSEIMONFUCKINGVACATION👅 $
//               supLilBitch "You're pretty thicc if you're greater than 10"!!!
//           #
//           supLilBitch "I love myself"!!!
//       #
//   #
//   ATTENTIONATTENTION🗣 fakeAssBitches () $
//       wordz worstQuality: "Being redundant and centrally irrelevant"!!!
//       sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//           boolz x: 10!!!
//           iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//               supLilBitch "You're less than 10 hoe"!!!
//           # becauseWhyyy😼 x == 10 $
//               supLilBitch "10s 10s ACROSS THE BOARD"!!!
//           # BECAUSEIMONFUCKINGVACATION👅 $
//               supLilBitch "You're pretty thicc if you're greater than 10"!!!
//           #
//           supLilBitch "I love myself"!!!
//       #
//   #
//   oop ask Toal how to do assignment for objects with the same identifier
//   fakeAssBitches x: fakeAssBitches() !!!
//   digitz x: 10!!!
//   x: 5!!!
//   oop I checked that setting x to a non-digitz type threw an error so we can a test for that
//   :/yes yes yes
//   yes
//   yeah
//   /:
//   stayz wordz whoIAm : "A real hot girl."!!!
//   sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//       supLilBitch "I love myself"!!!
//   #
//   hotlineBling💎 hiMomma()!!!
//   weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
//       openHerUp🍑 [0 spreadThatThang🍯 10] $
//               supLilBitch "I don't give a fuck"!!!
//       #
//   #
//   oop leftOnRead()!!!
//       sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//           boolz x: 10!!!
//           iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//               supLilBitch "You're less than 10 hoe"!!!
//           # becauseWhyyy😼 x == 10 $
//               supLilBitch "10s 10s ACROSS THE BOARD"!!!
//           # BECAUSEIMONFUCKINGVACATION👅 $
//               supLilBitch "You're pretty thicc if you're greater than 10"!!!
//           #
//           andThemsTheFacts "I love myself"!!!
//       #
//       sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//           digitz number: 0!!!
//           wordz day: ""!!!
//           shutUpGirlfriend😈 number $
//             andWhatAboutIt👉 0 $
//                 day : "Sunday"!!!
//                 GTFO💩!!!
//             #
//             andWhatAboutIt👉 6  $
//                 day : "Saturday"!!!
//                 GTFO💩!!!
//             #
//             andLetMeDoMe🤑 $
//                 day : "Weekday"!!!
//             #
//           #
//           supLilBitch "today is a " + day!!!
//       #
//       weOutHereTryinToFunction leftOnRead hiMomma()$
//           wylin🤪 i < 10  $
//               text: text + "The number is " + i!!!
//               i++!!!
//           #
//       #
//   sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
//       supLilBitch "I love myself"!!!
//   #
//   hotlineBling💎 hiMomma()!!!
//   seeYa x : x * 10@ wouldntWannBeYa!!!
//   tuplez<digitz> a : (0.2e5, 30, 40, 50)!!!
//   sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma(digitz x, digitz y)$
//           boolz x: 10!!!
//           iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
//               supLilBitch "You're less than 10 hoe"!!!
//           # becauseWhyyy😼 x == 10 $
//               supLilBitch "10s 10s ACROSS THE BOARD"!!!
//           # BECAUSEIMONFUCKINGVACATION👅 $
//               supLilBitch "You're pretty thicc if you're greater than 10"!!!
//           #
//           supLilBitch "I love myself"!!!
//           supLilBitch x!!!
//           supLilBitch y!!!
//   #
//   hotlineBling💎 hiMomma(digitz x: 5, digitz y: 6)!!!
//   weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
//       boolz likeWhiteOnRice: trueShit!!!
//       openHerUp🍑 [0 spreadThatThang🍯 10] $
//               iHaveSomethingToSay🙅🏾‍♀️ (likeWhiteOnRice)$
//                   supLilBitch "I don't give a fuck"!!!
//               #
//               BECAUSEIMONFUCKINGVACATION👅$
//                   GTFO💩!!!
//               #
//       #
//   #
//   hiMomma(digitz onRepeat: 10)!!!
//   weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
//       boolz likeWhiteOnRice: trueShit!!!
//       openHerUp🍑 [0 spreadThatThang🍯 10] $
//               iHaveSomethingToSay🙅🏾‍♀️ (likeWhiteOnRice)$
//                   supLilBitch "I don't give a fuck"!!!
//               #
//               BECAUSEIMONFUCKINGVACATION👅$
//                   GTFO💩!!!
//               #
//       #
//   #
//   hiMomma(digitz onRepeat: 10)!!!
//   weOutHereTryinToFunction leftOnRead hiMomma1(digitz onRepeat)$
//       boolz likeWhiteOnRice: trueShit!!!
//       openHerUp🍑 [0 spreadThatThang🍯 10] $
//               iHaveSomethingToSay🙅🏾‍♀️ (likeWhiteOnRice)$
//                   keepItPushin!!!
//               #
//               BECAUSEIMONFUCKINGVACATION👅$
//                   supLilBitch "I don't give a fuck"!!!
//               #
//       #
//   #
//   hiMomma1(digitz onRepeat: 10)!!!
//   weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
//       boolz likeWhiteOnRice: trueShit!!!
//       openHerUp🍑 [0 spreadThatThang🍯 10] $
//               iHaveSomethingToSay🙅🏾‍♀️ (likeWhiteOnRice)$
//                   supLilBitch "I don't give a fuck"!!!
//               #
//               BECAUSEIMONFUCKINGVACATION👅$
//                   GTFO💩!!!
//               #
//       #
//   #
//   hiMomma(digitz onRepeat: 10)!!!
//   weOutHereTryinToFunction leftOnRead hiMomma1(digitz onRepeat)$
//       boolz likeWhiteOnRice: trueShit!!!
//       openHerUp🍑 [0 spreadThatThang🍯 10] $
//               iHaveSomethingToSay🙅🏾‍♀️ (likeWhiteOnRice)$
//                   keepItPushin!!!
//               #
//               BECAUSEIMONFUCKINGVACATION👅$
//                   supLilBitch "I don't give a fuck"!!!
//               #
//       #
//   #
//   hiMomma1(digitz onRepeat: 10)!!!
//   weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
//       boolz likeWhiteOnRice: trueShit!!!
//       openHerUp🍑 [0 spreadThatThang🍯 10] $
//               iHaveSomethingToSay🙅🏾‍♀️ (likeWhiteOnRice)$
//                   supLilBitch "I don't give a fuck"!!!
//               #
//               BECAUSEIMONFUCKINGVACATION👅$
//                   GTFO💩!!!
//               #
//       #
//   #
//   hiMomma(digitz onRepeat: 10)!!!
//   weOutHereTryinToFunction leftOnRead hiMomma1(digitz onRepeat)$
//       boolz likeWhiteOnRice: trueShit!!!
//       openHerUp🍑 [0 spreadThatThang🍯 10] $
//               iHaveSomethingToSay🙅🏾‍♀️ (likeWhiteOnRice)$
//                   keepItPushin!!!
//               #
//               BECAUSEIMONFUCKINGVACATION👅$
//                   supLilBitch "I don't give a fuck"!!!
//               #
//       #
//   #
//   hiMomma1(digitz onRepeat: 10)!!!
//   weOutHereTryinToFunction boolz hiMomma2(digitz compare1, digitz compare2)$
//       andThemsTheFacts (((5 ^ (compare1) * compare2) == 50) || compare1 < compare2) && (compare1 != BANGENERGY10) && (compare2 != -10)!!!
//   #
//   hiMomma2(digitz compare1: 5, digitz compare2: 6)!!!
//   hiMomma2(digitz compare1: 7, digitz compare2: -10)!!!
//   weOutHereTryinToFunction boolz hiMomma3(digitz compare1, digitz compare2)$
//       andThemsTheFacts (((5 ^ (compare1) * compare2) == 50) || compare1 < compare2) && (compare1 != BANGENERGY10) && (compare2 != -10)!!!
//   #
//   hiMomma3(digitz compare1: 5, digitz compare2: 6)!!!
//   hiMomma3(digitz compare1: 7, digitz compare2: -10)!!!
//   weOutHereTryinToFunction boolz hiMomma4(digitz compare1, digitz compare2, digitz compare3)$
//       andThemsTheFacts compare1 <= compare2 || compare2 >= compare1 || compare3 > 5!!!
//   #
//   hiMomma4(digitz compare1: 5, digitz compare2: 6, digitz compare3: 18)!!!
//   :/weOutHereTryinToFunction longz hiMomma5(digitz thiccHoe) $
//       andThemsTheFacts ((((thiccHoe + 5 - 2) // 2) / .5) % 3)!!!
//   # /:
//   weOutHereTryinToFunction leftOnRead hiMomma6(arrayz<digitz> hotGirlz)$
//       digitz hotGirlzLen: 4!!!
//       wylin🤪 hotGirlzLen > 0             $
//           oop
//           supLilBitch (hotGirlz[hotGirlzLen - 1])!!!
//           hotGirlzLen-- !!!
//       #
//   #
//   weOutHereTryinToFunction leftOnRead hiMomma7(dictz<digitz,wordz> hotGirlz)$
//       digitz hotGirlzLen: 0!!!
//       wylin🤪 hotGirlzLen < 4 $
//           supLilBitch (h.hotGirlzLen)!!!
//           hotGirlzLen++ !!!
//       #
//   #
//   weOutHereTryinToFunction leftOnRead hiMomma8(dictz<digitz,wordz> hotGirlz)$
//       digitz hotGirlzLen: 0!!!
//       wylin🤪 hotGirlzLen < 4 $
//           supLilBitch (hotGirlz[hotGirlzLen])!!!
//           hotGirlzLen++ !!!
//       #
//   #
//   hiMomma8(dictz <digitz,wordz> hotGirlz: $1 ~ "hotgirl1", 2 ~ "hotgirl2", 3 ~ "hotgirl3", 4 ~ "hotgirl4"#)!!!
//   weOutHereTryinToFunction digitz? hiMomma9(digitz? possibleNum)$
//       iHaveSomethingToSay🙅🏾‍♀️(possibleNum != deceasedOnYouHoes)$
//           andThemsTheFacts possibleNum!!!
//       #
//       andThemsTheFacts "Sorry, you didn't give us an actual fucking number!"!!!
//   #
//   weOutHereTryinToFunction setz<digitz>? hiMomma10(setz<digitz>? girlzzzz)$
//       iHaveSomethingToSay🙅🏾‍♀️(girlzzzz != deceasedOnYouHoes)$
//           supLilBitch "Try me, see what happens, trust it won't be cute"!!!
//       #
//       andThemsTheFacts "Sorry, you didn't give us an actual fucking set!"!!!
//   #
//   hiMomma10(setz<digitz>? girlzzzz:$1, 2, 3, 4, 5#)!!!
//   hiMomma10(setz<digitz>? girlzzzz: $#)!!!
//   hiMomma10(setz<digitz>? girlzzzz: deceasedOnYouHoes)!!!
//   weOutHereTryinToFunction tuplez<wordz>? hiMomma11(tuplez<wordz>? girlzzzz)$
//       iHaveSomethingToSay🙅🏾‍♀️(girlzzzz != deceasedOnYouHoes)$
//           supLilBitch "Try me, see what happens, trust it won't be cute"!!!
//       #
//       andThemsTheFacts "Sorry, you didn't give us an actual fucking tuple!"!!!
//   #
//   hiMomma11(tuplez<wordz>? girlzzzz: ("real", "ass", "bitches"))!!!
//   hiMomma11(tuplez<wordz>? girlzzzz: ())!!!
//   hiMomma11(tuplez<wordz>? girlzzzz: deceasedOnYouHoes)!!!
//   weOutHereTryinToFunction leftOnRead hiMomma12(setz<digitz> hotGirlz: $1, 2, 3, 4, 5#)$
//       digitz hotGirlzLen: 0!!!
//       wylin🤪 hotGirlzLen < 4 $
//           supLilBitch (hotGirlz.hotGirlzLen)!!!
//           hotGirlzLen++ !!!
//       #
//   #
//   hiMomma12(setz<digitz>? girlzzzz: $-2, 4, 6, 8, 10#)!!!
//   hiMomma12()!!!
//   oop I know the following is a dumb program, but it tests true and false keywords
//   weOutHereTryinToFunction boolz hiMomma13(digitz uARealHotGirl)$
//       iHaveSomethingToSay🙅🏾‍♀️(uARealHotGirl % 2 == 0)$
//           andThemsTheFacts fraudulentAssBitch!!!
//       #
//       andThemsTheFacts trueShit!!!
//   #
//   oop I know the following is a dumb program, but it tests true and false keywords
//   weOutHereTryinToFunction boolz hiMomma14(digitz uARealHotGirl)$
//       iHaveSomethingToSay🙅🏾‍♀️(uARealHotGirl % 2 == 0)$
//           andThemsTheFacts BANGENERGY fraudulentAssBitch!!!
//       #
//       andThemsTheFacts BANGENERGY trueShit!!!
//   #`
//   ]
// };

// describe("The parser", () => {
//   Object.entries(fixture).forEach(([name, [source, expected]]) => {
//     test(`produces the correct AST for ${name}`, done => {
//       expect(parse(source)).toEqual(expected);
//       done();
//     });
//   });

//   test("throws an exception on a syntax error", done => {
//     expect(() => parse("as$df^&%*$&")).toThrow();
//     done();
//   });
// });
