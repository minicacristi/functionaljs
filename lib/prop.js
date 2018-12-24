const curry = require('./curry');
const prop = curry((p, o) => o[p]);

module.exports = prop;