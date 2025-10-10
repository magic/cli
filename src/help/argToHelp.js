import is from '@magic/types'
import log from '@magic/log'
import error from '@magic/error'

import { findLongestString } from './findLongestString.js'

const lib = '@magic/cli.help.argToHelp'

export const argToHelp = (arr, help = {}, defaults = {}) => {
  if (!is.array(arr)) {
    throw error(
      `${lib} expects the first argument to be a non-empty array, received: ${arr}`,
      'E_MISSING_ARGUMENT',
    )
  }

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
        let val = defaults[name]
        if (is.string(val)) {
          val = `'${val.replace(/'/gim, "'")}'`
        }

        res += ` - default: ${log.paint('green', val)}`
      }

      if (aliases.length) {
        res += ` - alias: ["${aliases.map(a => log.paint('yellow', a)).join('", "')}"]`
      }

      return res
    })
    .join('\n')
}
