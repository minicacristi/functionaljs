const Container = require('../lib/container');
const Maybe = require('../lib/maybe');

const append = require('../lib/append');
const prop = require('../lib/prop');
const match = require('../lib/match');
const add = require('../lib/add');

// (a -> b) -> Container a -> Container b
Container.prototype.map = function (f) {
  return Container.of(f(this.$value));
};

Container.of(2).map(two => two + 2); 
// Container(4)

Container.of('flamethrowers').map(s => s.toUpperCase()); 
// Container('FLAMETHROWERS')

console.log(Container.of('bombs').map(append(' away')).map(prop('length')));
// Container(10)

Maybe.of('Malkovich Malkovich').map(match(/a/ig));
// Just(True)

Maybe.of(null).map(match(/a/ig));
// Nothing

Maybe.of({ name: 'Boris' }).map(prop('age')).map(add(10));
// Nothing

console.log(Maybe.of({ name: 'Dinah', age: 14 }).map(prop('age')).map(add(10)));
// Just(24)

/*
Either.of('rain').map(str => `b${str}`); // Right('brain')
left('rain').map(str => `It's gonna ${str}, better bring your umbrella!`); // Left('rain')
Either.of({ host: 'localhost', port: 80}).map(prop('host')); // Right('localhost')
left('rolls eyes...').map(prop('host')); // left ('rolls eyes..')
*/