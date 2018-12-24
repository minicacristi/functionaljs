class Left extends Either {
  map(f) {
    return this;
  }

  inspect() {
    return `Left (${inspect(this.$value)})`;
  }
}

class Right extends Either {
  map(f) {
    return Either.of(f(this.$value));
  }

  inspect() {
    return `Right (${inspect(this.$value)})`;
  }
}

module.exports = Left;