import { is } from '@magic/test'
import { cli } from '../src/index.mjs'

export default [
  { fn: () => cli, expect: is.function, info: 'cli exports a function' },
  { fn: () => cli.spawn, expect: is.function, info: 'cli.spawn exists' },
  { fn: () => cli.exec, expect: is.function, info: 'cli.exec exists' },
  { fn: () => cli.exec, expect: is.deep.equal(cli.spawn), info: 'cli.spawn equals cli.exec' },
]