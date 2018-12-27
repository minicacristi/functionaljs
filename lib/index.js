const ALGEBRAIC = require('./algebraic/index');
const ESSENTIALS = require('./essentials/index');
const POINTFREE = require('./pointfree/index');

module.exports = {
  ALGEBRAIC,
  ESSENTIALS,
  POINTFREE,
  ...ALGEBRAIC,
  ...ESSENTIALS,
  ...POINTFREE
}