const curry = require('./curry');
const Left = require('../algebraic/Left');

const left = (x) => { 
  return new Left(x);
};

const either = curry((f, g, e) => {
  let result;

  switch (e.constructor) {
    case Left:
      result = f(e.$value);
      break;

    case Right:
      result = g(e.$value);
      break;

    // No Default
  }

  return result;
});

module.exports = {
  either,
  left
};

