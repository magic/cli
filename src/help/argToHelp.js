const is = require('@magic/types')
const log = require('@magic/log')

const argToHelp = (arr, help = {}) =>
  arr.map(opt => {
    if (is.string(opt)) {
      return opt
    } else {
      const [name, ...aliases] = opt
      let res = log.paint('yellow', name)

      if (help[name]) {
        res += ` - ${help[name]}`
      }

      if (aliases.length) {
        res += ` - alias: ["${aliases.map(a => log.paint('yellow', a)).join('", "')}"]`
      }

      res += '\n'
      return res
    }
  })

module.exports = argToHelp
