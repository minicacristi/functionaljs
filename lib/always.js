const curry = require('./curry');
const always = curry((a) => a);

module.exports = always;