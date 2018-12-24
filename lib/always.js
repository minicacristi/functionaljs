const curry = require('./curry');
const always = curry(() => a);

module.exports = always;