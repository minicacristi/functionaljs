class Either {
  static of(x) {
    return new Right(x);
  }

  constructor(x) {
    this.$value = x;
  }
}

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

const left = x => new Left(x);
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

Either.of('rain').map(str => `b${str}`); // Right('brain')
left('rain').map(str => `It's gonna ${str}, better bring your umbrella!`); // Left('rain')
Either.of({ host: 'localhost', port: 80}).map(prop('host')); // Right('localhost')
left('rolls eyes...').map(prop('host')); // left ('rolls eyes..')
