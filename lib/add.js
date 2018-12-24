const curry = require('./curry');
// add :: Number -> Number -> Number
const add = curry((a, b) => a + b);

module.exports = add;