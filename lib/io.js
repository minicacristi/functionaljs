class IO {
  static of(x) {
    return new IO(() => x);
  }

  constructor(fn) {
    this.unsafePerformIO  = fn;
  }

  map(fn) {
    return new IO(compose(fn, this.unsafePerformIO));
  }

  inspect() {
    return `IO(${inspect(this.unsafePerformIO )})`;
  }
}

module.exports = IO;