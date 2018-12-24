
/**
 * Object oriented mode.
 */

class Flock {
  constructor(n) {
    this.seagulls = n;
  }

  conjoin(other) {
    this.seagulls += other.seagulls;
    return this; // this is important for chaining
  }

  breed(other) {
    this.seagulls = this.seagulls * other.seagulls;
    return this;
  }
}

const a = new Flock(4);
const b = new Flock(2);
const c = new Flock(0);
let res = a.conjoin(c).breed(b).conjoin(a.breed(b)).seagulls;


/**
 * Functional mode
 */

 const conjoin = (x, y) => x + y;
 const breed = (x, y) => x * y;

 res = conjoin(breed(conjoin(4, 0), 2), breed(4, 2))
 // easier and correct due to no state muttation


const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

const flockA = 4;
const flockB = 2;
const flockC = 0;
res =
    add(multiply(flockB, add(flockA, flockC)), multiply(flockA, flockB));
// 16

// Original line
add(multiply(flockB, add(flockA, flockC)), multiply(flockA, flockB));

// Apply the identity property to remove the extra add
// (add(flockA, flockC) == flockA)
add(multiply(flockB, flockA), multiply(flockA, flockB));

// Apply distributive property to achieve our result
res = multiply(flockB, add(flockA, flockA));

console.log(res)