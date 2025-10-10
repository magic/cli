#!/usr/bin/env node

import log from '@magic/log'

import cli from '../src/index.js'

const cliArgs = {
  options: [['--name', '-n']],
  commands: ['hello'],
  help: {
    name: 'magic-cli hello world',
    header: 'used to test the cli library.',
    commands: {
      hello: 'echo hello ${name}',
    },
    options: {
      '--name': 'name to hello to',
    },
    example: `
# the obligatory
bin/bin.js hello --name World
`,
  },
  default: {
    '--name': 'World',
  },
  single: ['--name'],
  required: ['--name'],
}

const { args, commands } = cli(cliArgs)

if (commands.hello) {
  log.success('hello,', args.name)
}
