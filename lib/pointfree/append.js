const flip = require('./flip');
const concat = require('./concat');

const append = flip(concat);

module.exports = append;