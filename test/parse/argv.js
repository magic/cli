import { is } from '@magic/test'
import { parseArgv } from '../../src/parse/argv.js'

export default [
  {
    fn: () =>
      parseArgv({
        prepend: { '--foo': 'bar' },
      }),
    expect: t => is.deep.equal(t.argv, { '--foo': ['bar'] }),
    info: 'parseArgv handles prepend as ArgMap',
  },

  {
    fn: () =>
      parseArgv({
        prepend: ['--alpha', 'beta'],
      }),
    expect: t => is.deep.equal(t.argv, {}),
    info: 'parseArgv handles prepend as array without affecting argv keys',
  },

  {
    fn: () =>
      parseArgv({
        default: { '--default': 'val' },
      }),
    expect: t => is.deep.equal(t.argv, { '--default': ['val'] }),
    info: 'parseArgv adds default values if missing',
  },

  {
    fn: () =>
      parseArgv({
        default: { '--list': ['a', 'b'] },
      }),
    expect: t => is.deep.equal(t.argv, { '--list': ['a', 'b'] }),
    info: 'parseArgv adds default values as array',
  },

  // {
  //   fn: () =>
  //     parseArgv({
  //       append: ['--pure', 'true'],
  //       pure: true,
  //     }),
  //   expect: t => is.deep.equal(t.argv, { '--pure': ['true'] }),
  //   info: 'parseArgv in pure mode does not modify process.argv',
  // },

  {
    fn: () =>
      parseArgv({
        options: [['--alias', '-a']],
        append: ['-a', 'value'],
      }),
    expect: is.deep.equal({ argv: { '--alias': ['value'] }, args: { alias: ['value'] } }),
    info: 'parseArgv correctly resolves option aliases',
  },

  {
    fn: () =>
      parseArgv({
        options: [['--multi']],
        append: ['--multi', 'one', 'two', 'three'],
      }),
    expect: {
      argv: { '--multi': ['one', 'two', 'three'] },
      args: { multi: ['one', 'two', 'three'] },
    },
    info: 'parseArgv collects multiple arguments for a single flag',
  },

  {
    fn: () => parseArgv(),
    expect: t => is.deep.equal(t.argv, {}),
    info: 'parseArgv returns empty argv if no args given',
  },
]
