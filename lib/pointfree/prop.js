const curry = require('../essentials/curry');
const prop = curry((p, o) => { 
  return o[p] 
});

module.exports = prop;