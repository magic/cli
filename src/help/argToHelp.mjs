import is from '@magic/types'
import log from '@magic/log'

import { findLongestString } from './findLongestString.mjs'

export const argToHelp = (arr, help = {}, defaults = {}) => {
  const longest = findLongestString(arr)

  return arr
    .map(opt => {
      let name = opt
      let aliases = []
      if (is.array(name)) {
        const [n, ...al] = opt
        name = n
        aliases = al
      }

      let res = log.paint('yellow', name)

      const dist = longest.length - name.length
      const placeholder = Array(dist + 1).join(' ')

      res += placeholder

      if (help[name]) {
        res += ` - ${help[name]}`
      }

      if (defaults[name]) {
        res += ` - default: ${defaults[name]}`
      }

      if (aliases.length) {
        res += ` - alias: ["${aliases.map(a => log.paint('yellow', a)).join('", "')}"]`
      }

      return res
    })
    .join('\n')
}
