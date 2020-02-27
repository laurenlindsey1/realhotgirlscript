module.exports = class SwitchStatement {
    constructor(expression, cases, alternate) {
      Object.assign(this, { expression, cases, alternate }); // do we need to deal with optional default?
    }
};
