import is from '@magic/types'
import cases from '@magic/cases'

export const clean = (cli, props = {}) => {
  if (is.empty(props.single)) {
    return cli
  }

  props.single.map(s => {
    const c = cases.camel(s)
    const def = props.default && (props.default[s] || props.default[c])

    const a = cli.argv[s]

    if (!is.empty(a)) {
      const str = is.array(a) ? a.join(' ') : a

      if (str) {
        cli.argv[s] = str
        cli.args[c] = str
      }
    } else if (def) {
      cli.argv[s] = def
      cli.args[c] = def
    }
  })

  return cli
}
