import { parseEnv } from './env.js'
import { parseArgv } from './argv.js'
import { parseCommands } from './commands.js'
import { parseRequired } from './required.js'
import { clean } from './clean.js'

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
 * Parses CLI arguments, commands, environment variables, and required options.
 *
 * @param {ParseProps} props
 * @returns {ParsedCLI}
 */
export const parse = props => {
  const { pure = false } = props

  const { pureEnv = pure, pureArgv = pure, pureCommands = pure } = props

  const env = parseEnv({ env: props.env || [], pure: pureEnv })
  const { argv, args } = parseArgv({ ...props, pure: pureArgv })
  const commands = parseCommands({ ...props, pure: pureCommands })

  const cli = {
    env,
    argv,
    args,
    commands,
    errors: [],
  }

  const parsed = clean(cli, props)

  parsed.errors = parseRequired({ props, parsed })

  return parsed
}
