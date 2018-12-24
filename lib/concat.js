const curry = require('./curry');
const concat = curry((a, b) => a.concat(b));
module.exports = concat;