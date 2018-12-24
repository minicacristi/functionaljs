const Container = require('../lib/container');
const append = require('../lib/append');
const prop = require('../lib/prop');
// (a -> b) -> Container a -> Container b
Container.prototype.map = function (f) {
  return Container.of(f(this.$value));
};

Container.of(2).map(two => two + 2); 
// Container(4)

Container.of('flamethrowers').map(s => s.toUpperCase()); 
// Container('FLAMETHROWERS')

Container.of('bombs').map(append(' away')).map(prop('length')); 
// Container(10)
/*
Either.of('rain').map(str => `b${str}`); // Right('brain')
left('rain').map(str => `It's gonna ${str}, better bring your umbrella!`); // Left('rain')
Either.of({ host: 'localhost', port: 80}).map(prop('host')); // Right('localhost')
left('rolls eyes...').map(prop('host')); // left ('rolls eyes..')
*/