const moment = require('moment');

const curry = require('../lib/essentials/curry');
const compose = require('../lib/essentials/compose');
const map = require('../lib').POINTFREE.map;
const Maybe = require('../lib').ALGEBRAIC.Maybe;
const Either = require('../lib').ALGEBRAIC.Either;
const maybe = require('../lib').ESSENTIALS.maybe;
const f = require('../lib');
// withdraw :: Number -> Account -> Maybe(Account)
var withdraw = curry((amount, { balance }) =>
  Maybe.of(balance >= amount ? { balance: balance - amount } : null));

// This function is hypothetical, not implemented here... nor anywhere else.
// updateLedger :: Account -> Account 
var updateLedger = account => account;

// remainingBalance :: Account -> String
var remainingBalance = ({ balance }) => `Your balance is $${balance}`;

// finishTransaction :: Account -> String
var finishTransaction = compose(remainingBalance, updateLedger);


// getTwenty :: Account -> Maybe(String)
var getTwenty = compose(map(finishTransaction), withdraw(20));

getTwenty({ balance: 200.00 });
// Just('Your balance is $180')

getTwenty({ balance: 10.00 });
// Nothing

// getTwenty :: Account -> String
var getTwenty = compose(maybe('You\'re broke!', finishTransaction), withdraw(20));

getTwenty({ balance: 200.00 });
// 'Your balance is $180.00'

getTwenty({ balance: 10.00 });
// 'You\'re broke!'


// getAge :: Date -> User -> Either(String, Number)
var getAge = curry((now, user) => {
  var birthDate = moment(user.birthDate, 'YYYY-MM-DD');

  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, 'years'))
    : f.left('Birth date could not be parsed');
});

getAge(moment(), { birthDate: '2005-12-12' });
// Right(9)

console.log(getAge(moment(), { birthDate: 'July 4, 2001' }));
// Left('Birth date could not be parsed')
var fortune = compose(f.toString, f.add(1));
console.log(fortune(2))
fortune = compose(f.concat('If you survive you will be '), fortune)

var zoltar = compose(map(fortune), getAge(moment()));
zoltar = compose(map(console.log), zoltar);
zoltar({ birthDate: '2005-12-12' });
// 'If you survive, you will be 10'
// Right(undefined)

zoltar({ birthDate: 'balloons!' });
// Left('Birth date could not be parsed')
// -- Default Minimal Context ----------------------------------------

// We can put normal, non futuristic values inside as well
f.Task.of(3).map(three => three + 1);
// Task(4)