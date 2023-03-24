## @magic/cli

declarative cli sanitization and execution for [@magic](https://magic.github.io/cli)

sanitizes cli flags from aliases to default names

rewrites process.argv accordingly

provides autogenerated --help output (that can be customized)

handles commands and environment.

### v0.0.11+:

ecmascript modules only. no commonjs support.

[html-docs](https://magic.github.io/cli/)

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[npm-image]: https://img.shields.io/npm/v/@magic/cli.svg
[npm-url]: https://www.npmjs.com/package/@magic/cli
[travis-image]: https://img.shields.io/travis/com/magic/cli.svg?branch=master
[travis-url]: https://travis-ci.com/magic/cli
[appveyor-image]: https://img.shields.io/appveyor/ci/magic/cli/master.svg
[appveyor-url]: https://ci.appveyor.com/project/magic/cli/branch/master
[coveralls-image]: https://coveralls.io/repos/github/magic/cli/badge.svg
[coveralls-url]: https://coveralls.io/github/magic/cli
[greenkeeper-image]: https://badges.greenkeeper.io/magic/cli.svg
[greenkeeper-url]: https://badges.greenkeeper.io/magic/cli.svg
[snyk-image]: https://snyk.io/test/github/magic/cli/badge.svg
[snyk-url]: https://snyk.io/test/github/magic/cli

- [dependencies](#dependencies)
- [install](#install)
- [caveats](#caveats)
- [usage](#usage)
- [argv](#argv)
- [commands](#commands)
- [help](#help)
- [config](#configuration)
- [pure](#config-pure)
- [append / prepend](#prepend-append)
- [default](#default)

### <a name="dependencies"></a>dependencies:

- [@magic/log](https://github.com/magic/log): console.log wrapper with loglevels
- [@magic/types](https://github.com/magic/types): type checking library
- [@magic/types](https://github.com/magic/cases): case checking library (CamelCase, snake_case, kebab-case)

@magic/log, @magic/cases and @magic/types have no dependencies.

### <a name="install"></a>install

be in a node ecmascript module project.

```bash
npm i --save-dev --save-exact @magic/cli
```

### <a name="caveats"></a>caveats

there are some quirks that need some careful consideration when designing a cli api
depending on your requirements, these caveats should seldomly apply.

##### last argument

if your last argument does not have a corresponding flag,
it will still be assigned to the last flag prior to it.

##### command name overload

if one of your options gets an argument that is equal to a command,
this command will be executed

##### flag name overload

cli arguments that start with a - will always be treated as flags, not values.

_those issues might get addressed in the future._

### <a name="usage"></a>Usage

first, define the cli file

```javascript
// ./bin.mjs
import { cli } from '@magic/cli'

const res = cli({
  commands: [['cmd1', 'cmd1alias'], 'cmd2'],
  options: [
    ['--flag1', '-f1'],
    ['--flag2', '-f2'],
  ],
  default: {
    '--default-key': 'default-value',
  },
  required: ['--default-key'],
  single: ['--default-key'],
  env: [[['--production', '--prod', '--p', '-p'], 'NODE_ENV', 'production']],
  pure: true, // do neither change process.argv nor process.env
  pureArgv: true, // do not change process.argv
  pureEnv: true, // do not change process.env
})

console.log(res)
```

### <a name="argv"></a>options / argv

argv mappings handle options and option aliases

using the cli file above

```bash
./bin.mjs -f1 arg1 arg2 -f2
```

resulting process.argv:

```javascript
process.argv = [
  '/path/to/bin/node',
  '/path/to/bin.mjs',
  'cmd1',
  '--flag1'
  'arg1',
  'arg2',
  '--flag2',
]
```

logged javascript object

```javascript
{
  argv: { '--flag1': ['arg1', arg2], '--flag2': [] },
  args: { flag1: ['arg1', 'arg2'], flag2: [] },
  // ... other fields
}
```

### <a name="commands"><a>commands

cli commands will be handled too.

```javascript
// call
./bin.js cmd1

// results:
{
  commands: { cmd1: true },
  // ... other fields
}
```

### <a name="help"></a>help output

@magic/cli will parse your configuration and create a help text based on it.

#### <a name="help-simple"></a>simple help message

```javascript
// ./bin.mjs

import cli from '@magic/cli'

const args = {
  commands: [['magic', 'm']],
  options: [['--spell', '-s']],
  env: [[['dev', 'development'], 'NODE_ENV', 'development']],
  help: 'custom help text',
}

const argv = cli(args)
```

then run ./bin.mjs without arguments

```bash
./bin.mjs

// help output
`
@magic/cli wrapped cli.

custom help text

cli commands
magic - aliases: ["m"]


possible command line flags:
--spell - aliases: ["-s"]

environment switches:
dev: set NODE_ENV to development - aliases ["development"]
`
```

#### <a name="help-detailed"></a>detailed help message

the help property will accept an object which maps to the args object

```javascript
import cli from '@magic/cli'

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
`
cli name

custom help text

commands:
magic - aliases: ["m"]

flags:
--spell - aliases: ["-s"]

environment switches:
dev: set process.NODE_ENV to development - aliases ["development"]
`
```

### <a name="clean"></a>clean

some cli arguments will be expected to return a string instead of a list of arguments.

this can be achieved using the single array

```javascript
const args = {
  options: [['--single', '-s']],
  single: ['--single'],
}

const res = cli(args)

console.log(res)
```

### <a name="required"></a>required

some cli arguments will be required.

this can be achieved using the required array.

if a required field is missing, a error message and the help will be shown.

```javascript
const args = {
  options: [['--required', '-r']],
  required: ['--required'],
}

const res = cli(args)

console.log(res)
```

### <a name="config"></a>configuration

there are some configuration parameters that can be passed to the cli function

#### <a name="config-pure"></a>pure

```javascript
const args = {
  pure: false, // set to true to prevent changes to process.argv and process.env
  pureEnv: false, // set to true to prevent changes to process.env
  pureArgv: false, // set to true to prevent changes to process.argv
}

cli(args)
```

### <a name="prepend-append"></a>prepend/append

process.argv values can be prepended and appended

```javascript
import cli from '@magic/cli'

const args = {
  prepend: ['prepended']
  append: ['appended']
}

cli(args)
```

#### <a name="default"></a>default

use this to set default process.argv key: value pairs that should be set if they are not

```javascript
import cli from '@magic/cli'

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
}
```

### Changelog

##### 0.0.1

first release

##### 0.0.3

cli's should now correctly process.exit(1) on error of the spawned process.

##### 0.0.4

console help output now aligns nicely

##### 0.0.5

node 12.4.0 does not have --experimental-node-modules fladg.

##### 0.0.6

readd --experimental-node-modules flag for 13.1.0+

##### 0.0.7

update dependencies
bump node version

##### 0.0.8

help is shown if cli has commands but none are given

##### 0.0.9

update dependencies

##### 0.0.10

update dependencies

##### 0.0.11

- parsed.args added. is copy of argv, but using camelCased keys without leading --.
- no commonjs fallback, ecmascript modules all the way
- parsed does not return aliases. env, argv, args, commands. thats it.

##### 0.0.12

add @magic/cases dependency

##### 0.0.13

update deps

##### 0.0.14

--help works for cli scripts without commands too

##### 0.0.15

cli will always provide --help and -h flags to show help

##### 0.0.16

- args can be set to be single now, making them return a .join(' ')ed string instead of an array
- args can be set to be required now, making the cli error and show the help if they are not.

##### 0.0.17

required args can now be an array. this allows '--a' or '--b' to be required.
errors if both are given.

##### 0.0.18

- the command `cli-name all` now automagically sets all available commands to true.
- command keys will always be set to a boolean, return false if task is supposed to not be active.

##### 0.0.19

regression: calling cli that has commands without commands will show help again.

##### 0.0.20

regression: make commands only have keys for active commands again

##### 0.0.21

finally get rid of the command regressions

##### 0.0.22

- add cli.prompt to get user input.
- do not error if args.options is empty
- exec and spawn now are separate functions corresponding to node builtins

##### 0.0.23

- cli.prompt: change call signature, remove PasswordStream

##### 0.0.24

- fix required node version
- update dependencies

##### 0.0.25

- prompt now has a yesDefault option
- prompt will add y/N or Y/n to the prompt message if it is missing

##### 0.0.26

- default help arguments are now output by default.

##### 0.0.27

nicer output for prompt messages

##### 0.0.28

bump required node version to 14.2.0

##### 0.0.29

update dependencies

##### 0.0.30

- update dependencies

##### 0.0.31

- bump required node version to 14.15.4
- update dependencies

##### 0.0.32

update dependencies

##### 0.0.33

update dependencies

##### 0.0.34

update dependencies

##### 0.0.35

- parse now can get an opts object as third argument to overwrite child_process.exec options
- help.argToHelp now errors if the first argument is not an array, before errors only got triggered by falsy arg.
- exec now uses @magic/error for errors.
- exec does not trim() the result.
- findLongestString sorts by length and then alphabetically
- export execFile
- update dependencies

##### 0.0.36

update dependencies

##### 0.0.37

update dependencies

##### 0.0.38

update dependencies

##### 0.0.39

- update devdependencies
- parse.argv does not error if args do not have a length

##### 0.0.40

update dependencies

##### 0.0.41

update dependencies

##### 0.0.42

update dependencies

##### 0.0.43

update dependencies

##### 0.0.44

- update dependencies
- add colors to default arg output

##### 0.0.45 - unreleased

- help.example can be an array
- update dependencies
- cli.prompt - msg can be an array
  ...
