const Container = require('../lib/algebraic/container');
const Maybe = require('../lib/Maybe');

const maybe = require('../lib/essentials/maybe');
const append = require('../lib/append');
const curry = require('../lib/essentials/curry');
const prop = require('../lib/prop');
const match = require('../lib/match');
const add = require('../lib/add');
const compose = require('../lib/compose');
const map = require('../lib/map');

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
// safeHead :: [a] -> Maybe(a)
const safeHead = xs => Maybe.of(xs[0]);

// streetName :: Object -> Maybe String
const streetName = compose(compose(map(prop('street')), safeHead), prop('addresses'));

streetName({ addresses: [] });
// Nothing

console.log(streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }));
// Just('Shady Ln.')

const withdraw = curry((amount, { balance }) => Maybe.of(balance >= amount ? { balance: balance - amount } : null));
const updateLedger = account => account;
const remainingBalance = ({ balance }) => `Your balance is $${balance}`;

const finishTransaction = compose(remainingBalance, updateLedger);
console.log(finishTransaction({ balance: 20 }));
var getTwenty = compose(map(finishTransaction), withdraw(20))

console.log(getTwenty({ balance: 2000 }));
console.log(getTwenty({ balance: 5 }));
// https://mostly-adequate.gitbooks.io/mostly-adequate-guide/ch08.html#use-cases

// getTwenty :: Account -> String
getTwenty = compose(maybe('You\'re broke!', finishTransaction), withdraw(20));

getTwenty({ balance: 200.00 }); 
// 'Your balance is $180.00'

getTwenty({ balance: 10.00 }); 
// 'You\'re broke!'