'use strict';

const convert = require('..');
const Big = require('big.js');

test('should default to returning a Number', () => {
  const actualResult = convert(2, 'BTC', 'BTC');
  expect(typeof actualResult).toBe('number');
});

test('should return a Number', () => {
  const actualResult = convert(2, 'BTC', 'BTC', 'Number');
  expect(typeof actualResult).toBe('number');
});

test('should return a Big number', () => {
  const actualResult = convert(2, 'BTC', 'BTC', 'Big');
  expect (typeof actualResult).toBe(typeof new Big(1));
});

test('should return a String', () => {
  const actualResult = convert(2100, 'mBTC', 'BTC', 'String');
  expect (typeof actualResult).toBe('string');
});

test('should convert an integer', () => {
  const actualResult = convert(123456789012345, 'Satoshi', 'BTC', 'Number');
  expect (typeof actualResult).toBe('number');

});

test('should convert a number', () => {
  const actualResult = convert(1234567.89012345, 'BTC', 'Satoshi', 'Number');
  expect (typeof actualResult).toBe('number');

});

test('should convert a string', () => {
  const actualResult = convert('2', 'BTC', 'BTC', 'Number');
  expect (typeof actualResult).toBe('number');
});

test('should convert a Big number', () => {
  const actualResult = convert(new Big(2), 'BTC', 'BTC', 'Number');
  expect (typeof actualResult).toBe('number');
});

test('should convert a NaN to a Number', () => {
  const actualResult = convert(NaN, 'BTC', 'BTC', 'Number');
  const actualResult2 = convert(NaN, 'BTC', 'mBTC', 'Number');
  expect (typeof actualResult).toBe('number');
  expect (typeof actualResult2).toBe('number');
});

test('should convert a NaN to a String', () => {
  const actualResult = convert(NaN, 'BTC', 'BTC', 'String');
  const actualResult2 = convert(NaN, 'BTC', 'mBTC', 'String');
  expect (typeof actualResult).toBe('string');
  expect (typeof actualResult2).toBe('string');
});

test('should not convert a NaN to a Big', () => {
  expect(() => {convert(NaN, 'BTC', 'BTC', 'Big')}).toThrow();
});

test('should handle rounding errors', () => {
  const actualResult = convert(4.6, 'Satoshi', 'BTC', 'Number');
  const actualResult2 = convert(0.000000046, 'BTC', 'Satoshi', 'Number');
  expect (typeof actualResult).toBe('number');
  expect (typeof actualResult2).toBe('number');
});

test('should throw when untest is undefined', () => {
  expect(() => {convert(new Big(2), 'x', 'BTC', 'Number')}).toThrow();
  expect(() => {convert(new Big(2), 'BTC', 'x', 'Number')}).toThrow();
  expect(() => {convert(NaN, 'x', 'BTC', 'Number')}).toThrow();
  expect(() => {convert(NaN, 'BTC', 'x', 'Number')}).toThrow();
});

test('should throw when representaion is undefined', () => {
  expect(() => {convert(2, 'BTC', 'mBTC', 'x')}).toThrow();
  expect(() => {convert(NaN, 'BTC', 'mBTC', 'x')}).toThrow();
});

test('should allow untest aliases', () => {
  expect(() => {convert(4.6, 'Satoshi', 'sat')}).not.toThrow();
  expect(() => {convert(4.6, 'μBTC', 'btest')}).toThrow();
});

test('should throw when unit already exists with a different conversion factor', () => {
  expect(() => {convert.addUnit('BTC', 1.5)}).toThrow();
});

test('should throw when unit is predefined and cannot be removed', () => {
  expect(() => {convert.removeUnit('BTC')}).toThrow();
});

test('should add a unit', () => {
  expect(() => {convert.addUnit('newUnit', 1)}).not.toThrow();
});

test('should remove a unit', () => {
  expect(() => {convert.addUnit('newUnit', 1)}).not.toThrow();
});

test('should handle new units errors', () => {
  convert.removeUnit('newUnit');
  expect(() => {convert(4.6, 'Satoshi', 'newUnit')}).toThrow();
  convert.addUnit('newUnit', 2);
  expect(() => {convert(4.6, 'Satoshi', 'newUnit')}).not.toThrow();
});
