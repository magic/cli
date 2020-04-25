import child_process from 'child_process'
import log from '@magic/log'

import { maybeHelp } from './help/index.mjs'
import { parse } from './parse/index.mjs'

import { exec as execute } from './exec.mjs'
import { spawn as spawner } from './spawn.mjs'
import { prompt as promptUser } from './prompt.mjs'

export const cli = (args = {}) => {
  const { options = [] } = args

  const hasHelpOption = options.some(option => option.includes('--help'))
  if (!hasHelpOption) {
    options.push(['--help', '-h'])
  }

  args.options = options

  const parsed = parse(args)

  const helpText = maybeHelp({ ...args, parsed })

  if (helpText) {
    log(helpText)
    process.exit()
  }

  return parsed
}

export const spawn = spawner
cli.spawn = spawner

export const exec = execute
cli.exec = execute

export const prompt = promptUser
cli.prompt = promptUser

export default cli
