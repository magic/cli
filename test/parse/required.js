import { is, tryCatch } from '@magic/test'
import { parseRequired } from '../../src/parse/required.js'

export default [
  {
    fn: tryCatch(parseRequired, { props: { required: ['test'] }, parsed: { argv: ['--name'] } }),
    expect: ['test'],
    info: 'required returns string[] with missing arguments if missing',
  },
]
