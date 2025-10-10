import deep from '@magic/deep'

export const findLongestString = arr => {
  arr = deep.flatten(arr)

  const sorted = arr.sort((a, b) => {
    if (a.length !== b.length) {
      return b.length - a.length
    }

    return a > b ? 1 : -1
  })

  return sorted[0]
}
