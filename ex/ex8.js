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

getAge(moment(), { birthDate: 'July 4, 2001' });
// Left('Birth date could not be parsed')