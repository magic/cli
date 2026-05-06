import { is, tryCatch } from '@magic/test'
import { execFile } from '../src/execFile.js'

export default [
  {
    fn: tryCatch(execFile),
    expect: is.error,
    info: 'execFile fails without arguments',
  },
  {
    fn: tryCatch(execFile, 'invalidFile'),
    expect: is.error,
    info: 'execFile fails with invalid file',
  },
  {
    fn: execFile('/bin/echo', ['success']),
    expect: t => t.toString().includes('success'),
    info: 'execFile resolves with stdout on success',
  },
]
