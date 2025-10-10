import log from '@magic/log'

import { maybeHelp } from './help/index.js'
import { parse } from './parse/index.js'

import { exec as execute } from './exec.js'
import { execFile as executeFile } from './execFile.js'
import { spawn as spawner } from './spawn.js'
import { prompt as promptUser } from './prompt.js'

/**
 * Main CLI entry point
 * @param {object} args - CLI configuration object.
 * @param {(string | string[])[]} [args.options=[]] - Command-line options array.
 * @returns {object} Parsed CLI data.
 */
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

export const execFile = executeFile
cli.execFile = executeFile

export default cli
