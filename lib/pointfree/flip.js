const curry = require('./essentials/curry');
const flip = curry((fn, a, b) => fn(b, a));

module.exports = flip;