#!/usr/bin/env node

const cli = require('./src')

const help = 'help text'

const commands = [
  ['magic', 'm'],
]
const options = [
  ['--spell', '-s'],
]
const env = [
  [['dev', 'development'], 'NODE_ENV', 'development'],
]

const argv = cli({ help, commands, options, env })

console.log(argv)
