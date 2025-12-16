import log from '@magic/log'

import { maybeHelp } from './help/index.js'
import { parse } from './parse/index.js'

import { exec as execute } from './exec.js'
import { execFile as executeFile } from './execFile.js'
import { spawn as spawner } from './spawn.js'
import { prompt as promptUser } from './prompt.js'

/**
 * @typedef {object} ParseProps
 * @property {Array<string|string[]>} [options]
 * @property {Record<string, any>|Array<any>} [prepend]
 * @property {Record<string, any>|Array<any>} [append]
 * @property {Record<string, any>} [default]
 * @property {boolean} [pure]
 * @property {boolean} [pureEnv]
 * @property {boolean} [pureArgv]
 * @property {boolean} [pureCommands]
 * @property {string[]} [single]
 * @property {Array<string|string[]>} [commands]
 * @property {Array<[string[], string, string]>} [env]
 * @property {Array<string|string[]>} [required]
 * @property {object} [help]
 */

/**
 * @typedef {object} ParsedCLI
 * @property {Record<string, string>} env
 * @property {Record<string, any>} argv
 * @property {Record<string, any>} args
 * @property {Record<string, boolean>} commands
 * @property {Array<string|string[]>} errors
 */

/**
 * Main CLI entry point
 * @param {ParseProps} args - CLI configuration object.
 * @returns {ParsedCLI}
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
