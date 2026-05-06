import { envToHelp } from '../../src/help/envToHelp.js'

export default [
  {
    fn: () => envToHelp([]),
    expect: '',
    info: 'envToHelp returns empty string for empty env array',
  },
  {
    fn: () => envToHelp(undefined),
    expect: '',
    info: 'envToHelp returns empty string when env is undefined',
  },
  {
    fn: () => envToHelp([[['--env'], 'MY_VAR', 'some value']]),
    expect: t => t.includes('MY_VAR') && t.includes('--env'),
    info: 'envToHelp formats env tuple correctly',
  },
  {
    fn: () => envToHelp([[['--env', '-e'], 'MY_VAR', 'some value']]),
    expect: t => t.includes('MY_VAR') && t.includes('-e'),
    info: 'envToHelp handles env with alias',
  },
]
