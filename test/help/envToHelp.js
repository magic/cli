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
]
