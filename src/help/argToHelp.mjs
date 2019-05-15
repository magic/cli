import is from '@magic/types'
import log from '@magic/log'

export const argToHelp = (arr, help = {}) =>
  arr
    .map(opt => {
      let name = opt
      let aliases = []
      if (is.array(name)) {
        const [n, ...al] = opt
        name = n
        aliases = al
      }

      let res = log.paint('yellow', name)

      if (help[name]) {
        res += ` - ${help[name]}`
      }

      if (aliases.length) {
        res += ` - alias: ["${aliases.map(a => log.paint('yellow', a)).join('", "')}"]`
      }

      return res
    })
    .join('\n')
