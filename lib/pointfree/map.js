const curry = require('../essentials/curry');
// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((fn, f) => {
  return f.map(fn)
});

module.exports = map;