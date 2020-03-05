// const parse = require("../parser");

const {
  ArrayExpression,
  ArrayType,
  AssignmentStatement,
  BinaryExpression,
  Block,
  BooleanType,
  BreakStatement,
  Call,
  ClassDeclaration,
  Closure,
  ConstType,
  ContinueStatement,
  DictExpression,
  DictType,
  FunctionDeclaration,
  IfStatement,
  LongType,
  Loop,
  NumericLiteral,
  Optionals,
  Print,
  Program,
  ReadStatement,
  ReturnStatement,
  SetExpression,
  SetType,
  StringType,
  SwitchStatement,
  SimpleStmt_call,
  TupleType,
  TupleExpression,
  Type,
  UnaryExpression,
  VariableDeclaration,
  VariableExpression,
  WhileStatement,
  WriteStatement,
  Case,
  KeValueExpression,
  SubscriptedExpression,
  MemberExpression,
  IdentifierExpression,
  IdentifierDeclaration,
  Parameter,
  Argument,
  IdType
} = require("../../ast");

const fixture = {
  1: [String.raw`arrayz<digitz> g : [1,2,3]!!!`],
  2: [
    String.raw`
    sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
        supLilBitch "I love myself"!!!
    #
    hotlineBling💎 hiMomma()!!!
    `
  ],
  3: [
    String.raw`
    sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
        boolz x: 10!!!
        iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
            supLilBitch "You're less than 10 hoe"!!!
        # becauseWhyyy😼 x == 10 $
            supLilBitch "10s 10s ACROSS THE BOARD"!!!
        # BECAUSEIMONFUCKINGVACATION👅 $
            supLilBitch "You're pretty thicc if you're greater than 10"!!!
        #
        andThemsTheFacts "I love myself"!!!
    #  
  `
  ],
  4: [
    String.raw`
    sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
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
    supLilBitch "today is a " + day!!!
    #  
  `
  ],
  5: [
    String.raw`
    ATTENTIONATTENTION🗣 fakeAssBitches () $
	    digitz x: 10!!!
    #
    `
  ],
  6: [
    String.raw`
    1+2*3!!!
    "oh no"!!!
    (  	123   ) !!!
    (2+3)-2!!!
    supLilBitch 3!!!
    supLilBitch "hey girl" !!!
    supLilBitch "wylin" !!!

    stayz wordz whoIAm : "A real hot girl."!!!
    digitz x: 10!!!
    x: 5!!!
    seeYa x : x * 10@ wouldntWannBeYa!!!

    oop single line comment
    :/ multi
    line
    comment
    /:
  `
  ],
  7: [
    String.raw`
    ATTENTIONATTENTION🗣 fakeAssBitches () $
        wordz worstQuality: "Being redundant and centrally irrelevant"!!!
        sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
            supLilBitch "I love myself"!!!
        #
    #
  `
  ],
  8: [
    String.raw`
    ATTENTIONATTENTION🗣 fakeAssBitches () $
        wordz worstQuality: "Being redundant and centrally irrelevant"!!!
        sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
            boolz x: 10!!!
            iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
                supLilBitch "You're less than 10 hoe"!!!
            # becauseWhyyy😼 x == 10 $
                supLilBitch "10s 10s ACROSS THE BOARD"!!!
            # BECAUSEIMONFUCKINGVACATION👅 $
                supLilBitch "You're pretty thicc if you're greater than 10"!!!
            #
            supLilBitch "I love myself"!!!
        #
    #
  `
  ],
  9: [
    String.raw`
    ATTENTIONATTENTION🗣fakeAssBitches () $
        stringz worstQuality: "Being redundant and centrally irrelevant"!!!
        sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma()$
            boolz x: 10!!!
            iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
                supLilBitch "You're less than 10 hoe"!!!
            # becauseWhyyy😼 x == 10 $
                supLilBitch "10s 10s ACROSS THE BOARD"!!!
            # BECAUSEIMONFUCKINGVACATION👅 $
                supLilBitch "You're pretty thicc if you're greater than 10"!!!
            #
            supLilBitch "I love myself"!!!
        #
    #
    :/ ask Toal how to do assignment for objects with the same identifier
    fakeAssBitches x: newBootzBeeeatch✨fakeAssBitches ()!!!
    /:
  `
  ],
  10: [
    String.raw`
    boolz x: 10!!!
    iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
        supLilBitch "You're less than 10 hoe"!!!
    # becauseWhyyy😼 x == 10 $
        supLilBitch "10s 10s ACROSS THE BOARD"!!!
    # BECAUSEIMONFUCKINGVACATION👅 $
        supLilBitch "You're pretty thicc if you're greater than 10"!!!
    #
  `
  ],
  11: [
    String.raw`
    dictz <wordz,digitz> x: $ "x"~1 #  !!!
    dictz <wordz,wordz> stateCapitals: $ California ~ "Sacramento", Nevada ~ "Carson City", Oregon ~ "Salem"#!!!
  `
  ],
  12: [
    String.raw`
    weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
        openHerUp🍑 digitz i: 0 🔥 i <= onRepeat 🔥 i++ $
            supLilBitch "I don't give a fuck"!!!
        #
    #
    hiMomma()!!!
    weOutHereTryinToFunction leftOnRead hiMomma(digitz onRepeat)$
        openHerUp🍑 digitz i: onRepeat - 1 🔥 i >= 0 🔥 i++ $
          supLilBitch "I love myself"!!!
        #
    #
    hiMomma()!!!
  `
  ],
  13: [
    String.raw`
    boolz x: 10!!!
    iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
        supLilBitch "You're less than 10 hoe"!!!
    # becauseWhyyy😼 x == 10 $
        supLilBitch "10s 10s ACROSS THE BOARD"!!!
    # BECAUSEIMONFUCKINGVACATION👅 $
        supLilBitch "You're pretty thicc if you're greater than 10"!!!
    #
  `
  ],
  14: [
    String.raw`
    sheWaits😩 weOutHereTryinToFunction leftOnRead hiMomma(digitz x, digitz y)$
        boolz x: 10!!!
        iHaveSomethingToSay🙅🏾‍♀️ x < 10 $
        supLilBitch "You're less than 10 hoe"!!!
        # becauseWhyyy😼 x == 10 $
        supLilBitch "10s 10s ACROSS THE BOARD"!!!
        # BECAUSEIMONFUCKINGVACATION👅 $
        supLilBitch "You're pretty thicc if you're greater than 10"!!!
        #
        supLilBitch "I love myself"!!!
        supLilBitch x!!!
        supLilBitch y!!!
    #
    hotlineBling💎 hiMomma(digitz x: 5, digitz y: 6)!!!
  `
  ],
  15: [],
  16: [],
  17: [],
  18: [],
  19: [],
  20: [],
  21: [],
  22: [],
  23: [],
  24: [],
  25: [],
  26: [],
  27: [],
  28: [],
  29: []
};

describe("The parser", () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct AST for ${name}`, done => {
      expect(parse(source)).toEqual(expected);
      done();
    });
  });

  test("throws an exception on a syntax error", done => {
    expect(() => parse("as$df^&%*$&")).toThrow();
    done();
  });
});
