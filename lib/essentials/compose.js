const compose = (f, g) => x => f(g(x));

const compose = (f, g) => {
  return (x) => {
    f(g(x));
  }
}

module.exports = compose;