// src/utils/index.js

/**
 * Combines class names and filters out falsy values
 * @param {...string} classes - Class names to combine
 * @returns {string} Combined class names
 * @example
 * classNames('foo', null, 'bar', undefined, 'baz') // returns 'foo bar baz'
 * classNames('foo', condition && 'bar') // returns 'foo bar' or 'foo' depending on condition
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}