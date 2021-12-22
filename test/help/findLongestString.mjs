import { findLongestString } from '../../src/help/findLongestString.mjs'

const strings = ['a', 'bbbbbbbb', 'ab', 'abc', 'abcd']

export default [
  {
    fn: findLongestString(strings),
    expect: 'bbbbbbbb',
    info: 'findLongestString finds the longest string',
  },
  {
    fn: findLongestString([...strings, 'bcdefghi']),
    expect: 'bbbbbbbb',
    info: 'findLongestString: if multiple strings have the same length, returns first alphabetically',
  },
  {
    fn: findLongestString([...strings, 'bcdefghi', 'aaaaaaaa']),
    expect: 'aaaaaaaa',
    info: 'findLongestString: if multiple strings have the same length, returns first alphabetically',
  },
]
