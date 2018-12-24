const curry = require('./curry');
const flip = curry((fn, a, b) => fn(b, a));

module.exports = flip;