import { deep } from '@magic/test'

import { parseCommands } from '../../src/parse/commands.mjs'

export default [
  {
    fn: parseCommands(),
    expect: deep.equal({}),
    info: 'parseCommands without arguments returns empty object',
  },
  {
    fn: parseCommands({ commands: ['docs'], pure: true }),
    expect: deep.equal({ docs: true }),
    info: 'parseCommands can handle commands and pure: true',
  },
  {
    fn: parseCommands({ commands: [1], pure: true }),
    expect: deep.equal({}),
    info: 'parseCommands can handle commands and pure: true',
  },
]
