import child_process from 'child_process'
import log from '@magic/log'

import { maybeHelp } from './help/index.mjs'
import { parse } from './parse/index.mjs'

import { exec as execute } from './exec.mjs'
import { prompt as promptUser } from './prompt/index.mjs'

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

export const exec = execute
export const spawn = execute

cli.spawn = cli.exec = execute

export const prompt = promptUser
cli.prompt = promptUser

export default cli
