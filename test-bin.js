#!/usr/bin/env node

const cli = require('./src')

const simpleHelp = 'custom help text'

const complexHelp = {
  name: 'cli name',
  text: 'custom help text',
  commands: {
    magic: 'magic info help text',
  },
  options: {
    '--spell': 'cast a simple spell',
  },
}

const args = {
  commands: [['magic', 'm']],
  options: [['--spell', '-s', '--s']],
  env: [[['dev', 'development'], 'NODE_ENV', 'development']],
  prepend: 'prepend',
  append: 'append',
  help: complexHelp,
}
const argv = cli(args)

// console.log(process.argv)
// console.log(argv)
