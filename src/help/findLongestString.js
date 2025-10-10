import deep from '@magic/deep'

/**
 * Finds the longest string within a (possibly nested) array.
 *
 * @param {Array<string | string[]>} arr - Array that may contain strings or nested arrays of strings.
 * @returns {string} The longest string found in the array.
 */
export const findLongestString = arr => {
  const sorted = arr.flat(200).sort((a, b) => {
    if (a.length !== b.length) {
      return b.length - a.length
    }

    return a > b ? 1 : -1
  })

  return sorted[0]
}
