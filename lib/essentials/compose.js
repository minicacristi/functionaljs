const compose = (f, g) => {
  return (x) => {
    return f(g(x));
  }
}

module.exports = compose;