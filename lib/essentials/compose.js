const compose = (f, g) => {
  return (x) => {
    f(g(x));
  }
}

module.exports = compose;