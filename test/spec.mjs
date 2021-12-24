import { is, version } from '@magic/test'
import { cli, prompt, exec, execFile, spawn } from '../src/index.mjs'

const spec = {
  spawn: 'fn',
  exec: 'fn',
  execFile: 'fn',
  prompt: 'fn',
}

export default [
  ...version(cli, spec),
  { fn: () => cli.spawn, expect: is.deep.equal(spawn), info: 'cli.spawn equals spawn' },
  { fn: () => cli.exec, expect: is.deep.equal(exec), info: 'cli.exec equals exec' },
  { fn: () => cli.execFile, expect: is.deep.equal(execFile), info: 'cli.exec equals exec' },
  { fn: () => cli.prompt, expect: is.deep.equal(prompt), info: 'cli.prompt equals prompt' },
]
