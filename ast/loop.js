class Loop {};

  class ClassicForLoop extends Loop {
    constructor(type, id, expressions, body) {
      super();
      Object.assign(this, { type, id, expressions, body });
    }
  };

  class SpreadForLoop extends Loop {
    constructor(expressions, body) {
      super();
      Object.assign(this, { expressions, body });
    }
  };
