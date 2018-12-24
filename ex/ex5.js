const l = console.log
const compose2 = (f, g) => x => f(g(x));

const exclaim = x => `${x}!`;
const uppercase = x => x.toUpperCase();
const shout = compose2(exclaim, uppercase);

l(shout('ba'));

const head = x => x[0];

const reverse = reduce((acc, x) => [x].concat(acc), []);
const last = compose(head, reverse);
const printLast = compose(l, last)
printLast([1,2,4])


// not pointfree because we mention the data: word
var snakeCase = word => word.toLowerCase().replace(/\s+/ig, '_');

// pointfree
snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);

// not pointfree because we mention the data: name
var initials = name => name.split(' ').map(compose(toUpperCase, head)).join('. ');

// pointfree
// NOTE: we use 'intercalate' from the appendix instead of 'join' introduced in Chapter 09!
initials = compose(intercalate('. '), map(compose(toUpperCase, head)), split(' '));

initials('hunter stockton thompson'); // 'H. S. T'
const dasherize = compose(
  join('-'),
  map(toLower),
  split(' '),
  replace(/\s{2,}/ig, ' '),
);

const g = x => x.length;
const f = x => x === 4;
const isFourLetterWord = compose(f, g);