import { is, tryCatch } from '@magic/test'
import { exec } from '../src/exec.js'

export default [
  {
    fn: tryCatch(exec),
    expect: is.error,
    info: 'exec fails without arguments',
  },
  {
    fn: tryCatch(exec, 'invalidCommand'),
    expect: is.error,
    info: 'exec fails with invalid command',
  },
  {
    fn: exec('echo success'),
    expect: t => t.includes('success'),
    info: 'exec resolves with stdout on success',
  },
  {
    fn: exec('node -e "console.error(123)"', { stderrToStdout: true }),
    expect: t => t.includes('123'),
    info: 'exec with stderrToStdout returns stderr as stdout',
  },
]
