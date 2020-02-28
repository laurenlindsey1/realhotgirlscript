class Loop {}; // Do we need to account for multiple ids and expressions??

  class ClassicForLoop extends Loop {
    constructor(type, initId, initexpression, testExpression, updateid, incop, body) {
      super();
      Object.assign(this, { type, initId, initexpression, testExpression, updateid, incop, body });
    }
  };

  class SpreadForLoop extends Loop {
    constructor(expression, spreadop, body) {
      super();
      Object.assign(this, { expression, spreadop, body });
    }
  };
