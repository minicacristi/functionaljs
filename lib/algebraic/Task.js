const compose = require('../essentials/compose');

class Task {
  constructor (fork) {
    this.fork = fork;
  }

  inspect() {
    return 'Task(?)'
  }

  static rejected(x) {
    return new Task((reject, _) => {
      return reject(x);
    });
  }

  static of(x) {
    return new Task((_, resolve) => {
      return resolve(x);
    })
  }

  map(fn) {
    return new Task((reject, resolve) => {
      this.fork(reject, compose(resolve, fn));
    })
  }

  ap(f) {
    return this.chain((fn) => {
      f.map(fn);
    });
  }
  
  // monad
  chain(fn) {
    return new Task((reject, resolve) => {
      this.fork(reject, (x) => {
          return fn(x).fork(reject, resolve)
      });
    })
  }

  join() {
    return this.chain(identity);
  }
}

module.exports = Task;