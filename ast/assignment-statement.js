module.exports = class AssignmentStatement {
  constructor(target, source) {
    Object.assign(this, { target, source });
  }
};
