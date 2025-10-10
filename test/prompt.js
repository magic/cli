import { tryCatch, is } from '@magic/test'
import { prompt } from '../src/prompt.js'

export default [
  // {
  //   fn: tryCatch(prompt, { type: 'invalidType' }),
  //   expect: is.error,
  //   info: 'prompt fails with invalid type',
  // },
  // {
  //   fn: () => prompt({ type: 'input', message: '' }),
  //   expect: is.string,
  //   info: 'prompt handles empty message input',
  // },
]
