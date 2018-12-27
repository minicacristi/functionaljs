const curry = require('../essentials/curry');
const concat = curry((a, b) => {
  return a.concat(b); 
});
module.exports = concat;