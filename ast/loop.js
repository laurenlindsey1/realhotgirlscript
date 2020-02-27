class Loop {}; // Do we need to account for multiple ids and expressions??

  class ClassicForLoop extends Loop {
    constructor(type, id, expression, body) {
      super();
      Object.assign(this, { type, id, expression, body });
    }
  };

  class SpreadForLoop extends Loop {
    constructor(expression, body) {
      super();
      Object.assign(this, { expression, body });
    }
  };
