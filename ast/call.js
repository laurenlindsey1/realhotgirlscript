module.exports = class Call {
  constructor( wait, id, args) {
    Object.assign(this, { wait, id, args });
  }
};
