import child_process from 'child_process'
import log from '@magic/log'

import { maybeHelp } from './help/index.mjs'
import { parse } from './parse/index.mjs'

export const cli = (args = {}) => {
  const parsed = parse(args)
  const helpText = maybeHelp({ args, parsed })
  if (helpText) {
    log(helpText)
    process.exit()
  }

  return parsed
}

export const exec = (cmd, args = []) => {
  args = args.join(' ')

  const res = child_process.spawn(cmd, args, { stdio: inherit, env: process.env })

  res.stdout.pipe(process.stdout)
  res.stderr.pipe(process.stderr)

  return res
}

export const spawn = exec

cli.spawn = cli.exec = exec
