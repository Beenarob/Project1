// set key
localStorage.test = 2;

// get key
console.log( localStorage.test ); // 2

// remove key
delete localStorage.test;

// we can use the name of a method as key, but it will give us an error with object notation
let key = 'length';
localStorage[key] = 5; // Error, can't assign length

// The same thing won't happen with method notation
localStorage.setItem(key, 5);
console.log(localStorage.getItem(key, 5));  // Will print 5 to the console