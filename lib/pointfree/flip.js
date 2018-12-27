const curry = require('../essentials/curry');
const flip = curry((fn, a, b) => {
  return fn(b, a)
});

module.exports = flip;