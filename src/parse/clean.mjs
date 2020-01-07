import is from '@magic/types'
import cases from '@magic/cases'

export const clean = (cli, props) => {
  if (is.empty(props.single)) {
    return cli
  }

  props.single.map(s => {
    if (cli.argv[s] && is.array(cli.argv[s])) {
      cli.argv[s] = cli.argv[s].join(' ')
    }

    const c = cases.camel(s)

    if (cli.args[c] && is.array(cli.args[c])) {
      cli.args[c] = cli.args[c].join(' ')
    }
  })

  return cli
}
