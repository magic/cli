import child_process from 'child_process'
import log from '@magic/log'

import { maybeHelp } from './help/index.mjs'
import { parse } from './parse/index.mjs'

export const cli = (args = {}) => {
  let hasHelpOption = args.options.some(option => option.includes('--help'))
  if (!hasHelpOption) {
    args.options.push(['--help', '-h'])
  }

  const parsed = parse(args)

  const helpText = maybeHelp({ ...args, parsed })

  if (helpText) {
    log(helpText)
    process.exit()
  }

  return parsed
}

export const exec = (cmd, args = []) => {
  const opts = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  }
  return child_process.spawn(cmd, args, opts)
}

export const spawn = exec

cli.spawn = cli.exec = exec

export default cli
