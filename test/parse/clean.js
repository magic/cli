import { deep } from '@magic/test'

import { clean } from '../../src/parse/clean.js'

const cliSingleFlagUsed = {
  env: [],
  argv: { '--name': 'World' },
  args: { name: 'World' },
  commands: {},
  errors: [],
}

const cliSingleFlagArray = {
  env: [],
  argv: { '--name': ['Word', 'Second', 'Third'] },
  args: { name: ['Word', 'Second', 'Third'] },
  commands: {},
  errors: [],
}

const cliSingleFlagUnused = {
  env: [],
  argv: {},
  args: {},
  commands: {},
  errors: [],
}

const cliSingleFlagDifferentThanDefault = {
  env: [],
  argv: { '--name': 'World2' },
  args: { name: 'World2' },
  commands: {},
  errors: [],
}

const props = {
  options: [
    ['--name', '-n'],
    ['--help', '-h'],
  ],
  commands: ['hello'],
  help: {
    name: 'magic-cli hello world',
    header: 'used to test the cli library.',
    commands: { hello: 'echo hello ${name}' },
    options: { '--name': 'name to hello to' },
    example: '\n# the obligatory\nbin/bin.js hello --name World\n',
  },
  required: ['--name'],
}

const responseSingleFlagUsed = {
  env: [],
  argv: {
    '--name': 'World',
  },
  args: {
    name: 'World',
  },
  commands: {},
  errors: [],
}

const responseSingleFlagUnused = {
  env: [],
  argv: { '--name': 'World' },
  args: { name: 'World' },
  commands: {},
  errors: [],
}

const responseSingleFlagDifferentThanDefault = {
  env: [],
  argv: { '--name': 'World2' },
  args: { name: 'World2' },
  commands: {},
  errors: [],
}

const responseSingleFlagArray = {
  env: [],
  argv: {
    '--name': 'Word Second Third',
  },
  args: {
    name: 'Word Second Third',
  },
  commands: {},
  errors: [],
}

export default [
  {
    fn: clean(cliSingleFlagUsed, { ...props, single: ['--name'] }),
    expect: deep.equal(responseSingleFlagUsed),
    info: 'parse.clean can handle valid props',
  },
  {
    fn: clean(cliSingleFlagUnused, { ...props, single: ['--name'] }),
    expect: deep.equal(responseSingleFlagUnused),
    info: 'parse.clean can handle props.single',
  },
  {
    fn: clean(cliSingleFlagUnused, {
      ...props,
      single: ['--name'],
      default: { '--name': 'World' },
    }),
    expect: deep.equal(responseSingleFlagUsed),
    info: 'parse.clean can handle default values',
  },

  {
    fn: clean(cliSingleFlagUnused, {
      ...props,
      single: ['--name'],
      default: { name: 'World' },
    }),
    expect: deep.equal(responseSingleFlagUsed),
    info: 'parse.clean can handle default values without flag "--"',
  },
  {
    fn: clean(cliSingleFlagDifferentThanDefault, {
      ...props,
      single: ['--name'],
      default: { '--name': 'World' },
    }),
    expect: deep.equal(responseSingleFlagDifferentThanDefault),
    info: 'parse.clean can overwrite default values',
  },
  {
    fn: clean(cliSingleFlagDifferentThanDefault, props),
    expect: deep.equal(responseSingleFlagDifferentThanDefault),
    info: 'parse.clean can handle cli without single flag',
  },
  {
    fn: clean(cliSingleFlagArray, {
      ...props,
      single: ['--name'],
    }),
    expect: deep.equal(responseSingleFlagArray),
    info: 'parse.clean can handle cli with array argv value',
  },
]
