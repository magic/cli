import { deep } from '@magic/test'
import { parseCommands } from '../../src/parse/commands.js'

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
    info: 'parseCommands can handle commands and pure: true with unexpected task type',
  },

  // New tests
  {
    fn: () => parseCommands({ commands: ['test'] }),
    expect: deep.equal({}),
    info: 'parseCommands returns empty object if command not in argv',
  },
  {
    fn: () => {
      process.argv.push('build')
      return parseCommands({ commands: ['build'] })
    },
    expect: deep.equal({ build: true }),
    info: 'parseCommands detects a single matching command in argv',
  },
  {
    fn: () => {
      process.argv.push('deploy')
      return parseCommands({ commands: [['deploy', 'dp']] })
    },
    expect: deep.equal({ deploy: true }),
    info: 'parseCommands detects alias commands and returns first name',
  },
  {
    fn: () => parseCommands({ commands: [['serve', 's']] }),
    expect: deep.equal({}),
    info: 'parseCommands returns empty if alias command not found in argv',
  },
  {
    fn: () => {
      process.argv.push('all')
      return parseCommands({ commands: ['docs', 'build'] })
    },
    expect: deep.equal({ docs: true, build: true }),
    info: 'parseCommands with "all" argument returns all commands as true',
  },
  {
    fn: () => {
      process.argv.push('serve')
      return parseCommands({ commands: [['serve', 's']], pure: false })
    },
    expect: deep.equal({ serve: true }),
    info: 'parseCommands replaces matching command in argv when pure is false',
  },
]
