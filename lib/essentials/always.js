const curry = require('./curry');

const always = curry((a) => {
  return a
});

module.exports = always;