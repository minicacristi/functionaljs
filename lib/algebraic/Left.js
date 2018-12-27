const Either = require('./Either').Either;
const inspect = require('../essentials/inspect');

class Left extends Either {
  map(f) {
    return this;
  }

  inspect() {
    return `Left (${inspect(this.$value)})`;
  }
}

module.exports = Left;