module.exports = {
  View: () => [
    h2('@magic/cli'),
    p('declarative cli sanitization and execution for [@magic](https://magic.github.io/cli)'),
    p('sanitizes cli flags from aliases to default names'),
    p('rewrites process.argv accordingly'),
    p('provides autogenerated --help output (that can be customized)'),
    p('also handles commands and environment for you'),

    p([Link({ to: 'https://magic.github.io/cli/' }, 'html-docs')]),

    GitBadges({
      project: 'magic/cli',
      appveyor: 'jaeh/cli',
    }),

    h3({ id: 'dependencies' }, 'dependencies:'),
    p([
      Link({ to: 'https://github.com/magic/log' }, '@magic/log'),
      ': console.log wrapper with loglevels',
    ]),
    p([Link({ to: 'https://github.com/magic/types' }, '@magic/types'), ': type checking library']),

    p('@magic/log and @magic/types have no dependencies.'),

    h3({ id: 'install' }, 'install'),
    p('be in a nodejs project'),
    Pre.View('npm i --save-dev @magic/cli'),

    h3({ id: 'caveats' }, 'caveats'),
    p([
      'there are some quirks that need some careful consideration when designing a cli api',
      ' depending on your requirements, these caveats should seldomly apply.',
    ]),

    ol([
      li([
        h5('last argument'),
        p([
          'if your last argument does not have a corresponding flag,',
          ' it will still be assigned to the last flag prior to it.',
        ]),
      ]),
      li([
        h5('option argument and command name clash'),
        p([
          'if one of your options gets an argument that is equal to a command, ',
          ' this command will be executed',
        ]),
      ]),
      li([
        h5('flag arguments can not start with a dash'),
        p('cli arguments that start with a - will always be treated as flags, not values.'),
      ]),
    ]),

    p('those issues might get addressed in the future.'),

    h3({ id: 'usage' }, 'Usage'),
    p('full api example'),

    Pre.View(`
// ./bin.js

#!/usr/bin/env node
const cli = require('@magic/cli')

const { argv, env, commands } = cli({
  commands: [
    ['cmd1', 'cmd1alias'],
    'cmd2',
  ],
  options: [
    ['--flag1', '-f1'],
    ['--flag2', '-f2'],
  ],
  default: [
    ['--default-key', 'default-value'],
  ],
  env: [[['--production', '--prod', '--p', '-p'], 'NODE_ENV', 'production']],
  pure: true, // do neither change process.argv nor process.env
  pureArgv: true, // do not change process.argv
  pureEnv: true, // do not change process.env
})`),

    h3({ id: 'argv' }, 'options / argv'),
    p('argv mappings will handle options and option aliases'),

    p(['using the ', Link({ to: '/#usage' }, 'cli file'), ' above']),

    p('then, in your terminal / bash'),
    Pre.View('bin.js -f1 arg1 arg2 -f2'),

    p('resulting process.argv'),
    Pre.View(`
process.argv = [
  '/path/to/bin/node',
  '/path/to/bin.js',
  '--flag1'
  'arg1',
  'arg2',
  '--flag2',
]`),

    p('returned javascript object'),
    Pre.View("argv === { '--flag1': ['arg1', arg2], '--flag2': []}"),

    h3({ id: 'commands' }, 'commands'),
    p('cli commands can be handled too.'),
    Pre.View(`
const cli = require('@magic/cli')

const args = {
  commands: [
    ['dev', 'development', 'start'],
    'serve',
  ],
}

const argv = cli(args)

// call
./bin.js dev serve

// results:
{
  cmds: ['dev', 'serve'],
  commands: ['dev', 'serve'],
}`),

    h3({ id: 'help' }, 'help output'),
    p([
      '@magic/cli will derive a help text from your configuration.',
      'help itself can be configured to provide better error messages',
    ]),

    h4({ id: 'help-simple' }, 'simple help message'),
    Pre.View(`
const cli = require('@magic/cli')

const args = {
  commands: [['magic', 'm']],
  options: [['--spell', '-s']],
  env: [[['dev', 'development'], 'NODE_ENV', 'development']],
  prepend: 'prepend',
  append: 'append',
  help: 'custom help text',
}

const argv = cli(args)

// running
./bin.js
// without arguments

// help output
\`
@magic/cli wrapped cli.

custom help text

cli commands
magic - aliases: ["m"]


possible command line flags:
--spell - aliases: ["-s"]


environment switches:
dev: set NODE_ENV to development - aliases ["development"]
\``),

    h4({ id: 'help-detailed' }, 'detailed help message'),
    p('the help property will accept an object which maps to the args object'),
    Pre.View(`
const cli = require('@magic/cli')

const args = {
  commands: [['magic', 'm']],
  options: [['--spell', '-s']],
  env: [[['dev', 'development'], 'NODE_ENV', 'development']],
  prepend: 'prepend',
  append: 'append',
  help: {
    name: 'cli name',
    text: 'custom help text',
    commands: {
      magic: 'magic info help text',
    },
    options: {
      '--spell': 'cast a simple spell',
    },
    env: ['dev', 'set environment to development'],
  },
}

const argv = cli(args)

// running
./bin.js
// without arguments

// help output
\`
cli name

custom help text

commands:
magic - aliases: ["m"]

flags:
--spell - aliases: ["-s"]

environment switches:
dev: set process.NODE_ENV to development - aliases ["development"]
\``),

    h3({ id: 'config' }, 'configuration'),
    p('there are some configuration parameters that can be passed to the cli function'),

    h4({ id: 'configuration-pure' }, 'pure'),
    Pre.View(`
const args = {
  pure: false,    // set to true to prevent changes to process.argv and process.env
  pureEnv: false, // set to true to prevent changes to process.env
  pureArgv: false, // set to true to prevent changes to process.argv
}

cli(args)`),

    h3({ id: 'prepend-append' }, 'prepend/append'),
    p('process.argv values can be prepended and appended'),
    Pre.View(`
const cli = require('@magic/cli)

const args = {
  prepend: ['prepended']
  append: ['appended']
}

cli(args)`),

    h4({ id: 'default' }, 'default'),
    p('use this to set default process.argv key: value pairs that should be set if they are not'),
    Pre.View(`
const cli = require('@magic/cli')

const args = {
  options: [
    ['--default-key'],
  ],
  default: [
    ['--default-key', 'default-value']
  ],
}

const argv = cli(args)

// returns
{
  argv: {
    '--default-key': 'default-value',
  },
}`),
  ],
}
