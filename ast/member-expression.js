module.exports = class MemberExpression {
    constructor(varexp, member) {
      Object.assign(this, { varexp, member });
    }
  };