import { is, tryCatch } from '@magic/test'
import { exec } from '../src/exec.js'

export default [
  {
    fn: tryCatch(exec), // no args
    expect: is.error,
    info: 'exec fails without arguments',
  },
  {
    fn: tryCatch(exec, 'invalidCommand'),
    expect: is.error,
    info: 'exec fails with invalid command',
  },
]
