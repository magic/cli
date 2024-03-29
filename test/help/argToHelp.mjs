import { tryCatch } from '@magic/test'

import { argToHelp } from '../../src/help/argToHelp.mjs'

const argToHelpCommandOutput =
  '\u001b[33mtest\u001b[39m  - test output\n\u001b[33mtest2\u001b[39m - test2 output'
const argToHelpCommandOutputWithDefaults = `\x1B[33mtest\x1B[39m  - test output - default: \x1B[32m'default test'\x1B[39m\n\x1B[33mtest2\x1B[39m - test2 output - default: \x1B[32m'default test2'\x1B[39m`

const argToHelpFlagOutput =
  '\u001b[33m--test\u001b[39m  - alias: ["\u001b[33m--t\u001b[39m", "\u001b[33m-t\u001b[39m"]\n\u001b[33m--test2\u001b[39m'
const argToHelpFlagOutputWithDefaults = `\x1B[33m--test\x1B[39m  - test output - default: \x1B[32m'default --test'\x1B[39m - alias: ["\x1B[33m--t\x1B[39m", "\x1B[33m-t\x1B[39m"]\n\x1B[33m--test2\x1B[39m - test2 output`

export default [
  {
    fn: tryCatch(argToHelp),
    expect: t => t.code === 'E_MISSING_ARGUMENT',
    info: 'argToHelp without arguments returns error code "E_MISSING_ARGUMENT"',
  },
  {
    fn: tryCatch(argToHelp),
    expect: t => t.name === 'E_MISSING_ARGUMENT',
    info: 'argToHelp without arguments returns error name "E_MISSING_ARGUMENT"',
  },
  {
    fn: argToHelp(['test', 'test2'], { test: 'test output', test2: 'test2 output' }),
    expect: argToHelpCommandOutput,
    info: 'argToHelp can handle commands',
  },
  {
    fn: argToHelp(
      ['test', 'test2'],
      { test: 'test output', test2: 'test2 output' },
      { test: 'default test', test2: 'default test2' },
    ),
    expect: argToHelpCommandOutputWithDefaults,
    info: 'argToHelp can handle defaults for commands',
  },
  {
    fn: argToHelp([['--test', '--t', '-t'], '--test2'], {
      test: 'test output',
      test2: 'test2 output',
    }),
    expect: argToHelpFlagOutput,
    info: 'argToHelp can handle flags with help',
  },

  {
    fn: argToHelp(
      [['--test', '--t', '-t'], '--test2'],
      { '--test': 'test output', '--test2': 'test2 output' },
      { '--test': 'default --test' },
    ),
    expect: argToHelpFlagOutputWithDefaults,
    info: 'argToHelp can handle flags with help and defaults',
  },
]
