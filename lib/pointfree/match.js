// match :: RegExp -> String -> Boolean
const curry = require('./essentials/curry');
const match = curry((re, str) => re.test(str));

module.exports = match;