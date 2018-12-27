const curry = require('../essentials/curry');
// add :: Number -> Number -> Number
const add = curry((a, b) => a + b);

module.exports = add;