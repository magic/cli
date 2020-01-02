export const View = state => [
  h2('@magic/cli'),
  p([
    'declarative cli sanitization and execution for ',
    Link({ to: 'https://magic.github.io' }, '@magic'),
  ]),
  p('sanitizes cli flags from aliases to default names'),
  p('rewrites process.argv accordingly'),
  p('provides autogenerated --help output (that can be customized)'),
  p('also handles commands and environment for you'),

  p("exports a commonjs file that allows to launch mjs files as cli's"),

  GitBadges('magic/cli'),

  h3({ id: 'install' }, 'install'),
  p('be in a nodejs project'),
  Pre('npm i --save-dev @magic/cli'),

  h3({ id: 'caveats' }, 'caveats'),
  p([
    'there are some quirks that need some careful consideration when designing a cli api',
    ' depending on your requirements, these caveats may or may not apply.',
  ]),

  ol([
    li([
      h4('last argument'),
      p([
        'if your last argument does not have a corresponding flag,',
        ' it will still be assigned to the last flag prior to it.',
        h5('workaround'),
        p('do not design a cli with a trailing command.'),
        p('TODO: add a config bool.'),
      ]),
    ]),
    li([
      h4('option argument and command name clash'),
      p([
        'if one of your options gets an argument that is equal to a command, ',
        ' this command will be executed',

        h5('workaround'),
        p('do not name your commands like the possible arguments.'),
      ]),
    ]),
    li([
      h4('flag arguments can not start with a dash'),
      p('cli arguments that start with a - will always be treated as flags, not values.'),

      h5('workaround'),
      p('do not design a cli that accepts arguments that start with a -'),
    ]),
  ]),

  p('those issues might get addressed in the future.'),

  h3({ id: 'usage' }, 'Usage'),
  p('full api example'),

  Pre(`
#!/usr/bin/env node

// ./bin.js
const spawnCli = require('@magic/cli')

const argv = ['--flag1', '--flag2', '/file/path/cli.mjs']

const cmd = 'node' // default

spawnCli(argv, cmd)
`),

  Pre(`
// ./bin.mjs

import cli from '@magic/cli/src/index.mjs''

const { argv, env, commands } = cli({
  commands: [
    ['cmd1', 'cmd1alias'],
    'cmd2',
  ],
  options: [
    ['--flag1', '-f1'],
    ['--flag2', '-f2'],
  ],
  default: {
    '--default-key': 'default-value',
  },
  env: [[['--production', '--prod', '--p', '-p'], 'NODE_ENV', 'production']],
  pure: true, // do neither change process.argv nor process.env
  pureArgv: true, // do not change process.argv
  pureEnv: true, // do not change process.env
})`),

  h3({ id: 'argv' }, 'options / argv'),
  p('argv mappings will handle options and option aliases'),

  p(['using the ', Link({ to: '/#usage' }, 'cli file'), ' above']),

  p('then, in your terminal / bash'),
  Pre('bin.js -f1 arg1 arg2 -f2'),

  p('resulting process.argv'),
  Pre(`
process.argv = [
  '/path/to/bin/node',
  '/path/to/bin.js',
  '--flag1'
  'arg1',
  'arg2',
  '--flag2',
]`),

  p('returned javascript object'),
  Pre("argv === { '--flag1': ['arg1', arg2], '--flag2': []}"),

  h3({ id: 'commands' }, 'commands'),
  p('cli commands can be handled too.'),
  Pre(`
import cli from '@magic/cli/src/index.mjs''

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
  Pre(`
import cli from '@magic/cli/src/index.mjs''

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
  Pre(`
import cli from '@magic/cli/src/index.mjs''

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

  h4({ id: 'config-pure' }, 'pure'),
  Pre(`
const args = {
  pure: false,    // set to true to prevent changes to process.argv and process.env
  pureEnv: false, // set to true to prevent changes to process.env
  pureArgv: false, // set to true to prevent changes to process.argv
}

cli(args)`),

  h3({ id: 'config-prepend-append' }, 'prepend/append'),
  p('process.argv values can be prepended and appended'),
  Pre(`
import cli from '@magic/cli/src/index.mjs'

const args = {
  prepend: ['prepended']
  append: ['appended']
}

cli(args)`),

  h4({ id: 'config-default' }, 'default'),
  p('use this to set default process.argv key: value pairs that should be set if they are not'),
  Pre(`
import cli from '@magic/cli/src/index.mjs''

const args = {
  options: [
    ['--default-key'],
  ],
  default: {
    '--default-key': 'default-value',
  },
}

const argv = cli(args)

// returns
{
  argv: {
    '--default-key': 'default-value',
  },
}`),

  h2({ id: 'changelog' }, 'changelog'),

  h3('0.0.3'),
  p('error if spawned process errors. (process.exit(1)'),

  h3('0.0.4'),
  p('console output now aligns'),

  h3('0.0.5'),
  p('node 12.4.0 does not have --experimental-node-modules flag.'),

  h3('0.0.6'),
  p('readd --experimental-node-modules flag for 13.1.0+'),

  h3('0.0.7'),
  p('bump node version'),
  p('update @magic/log'),

  h3('0.0.8'),
  p('help is shown if commands exist but none are given'),

  h3('0.0.9'),
  p('update dependencies'),

  h3('0.0.10'),
  p('update dependencies'),

  h2({ id: 'source' }, 'source'),
  p([
    'the source for this page is in the ',
    Link({ to: 'https://github.com/magic/cli/tree/master/example' }, 'example directory'),
    ' and gets built and published to github using ',
    Link({ to: 'https://github.com/magic/core' }, '@magic/core'),
  ]),
]
