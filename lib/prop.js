const curry = require('./essentials/curry');
const prop = curry((p, o) => o[p]);

module.exports = prop;