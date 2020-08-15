const assert = require('assert'); 
const sayHello = require('../test').sayHello;

describe('App test!', function () {
  it('sayHello should return "hello"', function () {
    assert.equal(sayHello(), 'hello');
  });
});