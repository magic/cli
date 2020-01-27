import { is } from '@magic/test'
import { cli, prompt, exec, spawn } from '../src/index.mjs'

export default [
  { fn: () => cli, expect: is.function, info: 'cli exports a function' },
  { fn: () => cli.spawn, expect: is.function, info: 'cli.spawn exists' },
  { fn: () => cli.exec, expect: is.function, info: 'cli.exec exists' },
  { fn: () => cli.prompt, expect: is.function, info: 'cli.exec exists' },
  { fn: () => cli.spawn, expect: is.deep.equal(spawn), info: 'cli.spawn equals spawn' },
  { fn: () => cli.exec, expect: is.deep.equal(exec), info: 'cli.exec equals exec' },
  { fn: () => cli.prompt, expect: is.deep.equal(prompt), info: 'cli.prompt equals prompt' },
]
