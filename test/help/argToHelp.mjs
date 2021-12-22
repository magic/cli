import { tryCatch } from '@magic/test'

import { argToHelp } from '../../src/help/argToHelp.mjs'

const argToHelpCommandOutput =
  '\u001b[33mtest\u001b[39m  - test output\n\u001b[33mtest2\u001b[39m - test2 output'
const argToHelpCommandOutputWithDefaults =
  '\u001b[33mtest\u001b[39m  - test output - default: default test\n\u001b[33mtest2\u001b[39m - test2 output - default: default test2'

const argToHelpFlagOutput =
  '\u001b[33m--test\u001b[39m  - alias: ["\u001b[33m--t\u001b[39m", "\u001b[33m-t\u001b[39m"]\n\u001b[33m--test2\u001b[39m'
const argToHelpFlagOutputWithDefaults =
  '\u001b[33m--test\u001b[39m  - test output - default: default --test - alias: ["\u001b[33m--t\u001b[39m", "\u001b[33m-t\u001b[39m"]\n\u001b[33m--test2\u001b[39m - test2 output'

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
