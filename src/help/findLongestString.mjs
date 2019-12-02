import is from '@magic/types'

export const findLongestString = arr => {
  const longest = arr.sort((a, b) => {
    if (is.array(a)) {
      a = findLongestString(a)
    }
    if (is.array(b)) {
      b = findLongestString(b)
    }

    return a.length > b.length ? -1 : 1
  })[0]

  if (is.array(longest)) {
    return longest[0]
  }

  return longest
}
