const l = console.log

const add = x => y => x + y;
const increment = add(1);
const addTen = add(10);

l(increment(2)); // 3
l(addTen(2)); // 12

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
};

const match = curry((what, s) => {
  return s.match(what);
});

const replace = curry((what, replacement, s) => {
  return s.replace(what, replacement);
})


const matchHoliday = match(/Holiday/);

const filter = curry((f, xs) => xs.filter(f));
const map = curry((f, xs) => xs.filter(f));

l(matchHoliday('Holiday is nice'))

match(/r/g, 'hello world'); // [ 'r' ]

const hasLetterR = match(/r/g); // x => x.match(/r/g)
hasLetterR('hello world'); // [ 'r' ]
hasLetterR('just j and s and t etc'); // null

filter(hasLetterR, ['rock and roll', 'smooth jazz']); // ['rock and roll']

const removeStringsWithoutRs = filter(hasLetterR); // xs => xs.filter(x => x.match(/r/g))
removeStringsWithoutRs(['rock and roll', 'smooth jazz', 'drum circle']); // ['rock and roll', 'drum circle']

const noVowels = replace(/[aeiou]/ig); // (r,x) => x.replace(/[aeiou]/ig, r)
const censored = noVowels('*'); // x => x.replace(/[aeiou]/ig, '*')
censored('Chocolate Rain'); // 'Ch*c*l*t* R**n'

var loudLastUpper = compose(exclaim, toUpperCase, head, reverse);

// -- or ---------------------------------------------------------------

var last = compose(head, reverse);
loudLastUpper = compose(exclaim, toUpperCase, last);

// -- or ---------------------------------------------------------------

last = compose(head, reverse);
const angry = compose(exclaim, toUpperCase);
loudLastUpper = compose(angry, last);

// more variations...
