import log from '@magic/log'
import is from '@magic/types'

import { envToHelp } from './envToHelp.js'
import { argToHelp } from './argToHelp.js'

/**
 * @typedef {object} ParsedCLI
 * @property {Record<string, any>} [args] - Parsed CLI flags or arguments.
 * @property {Record<string, any>} [commands] - Parsed subcommands.
 * @property {Array<string|string[]>} [errors] - Validation errors or missing required args.
 */

/**
 * @typedef {object} CLIHelpMeta
 * @property {string} [name] - CLI name shown in the help header.
 * @property {string} [text] - General help text or description.
 * @property {string|string[]} [example] - Example usage text or lines.
 * @property {Record<string, string>} [commands] - Help text for commands.
 * @property {Record<string, string>} [options] - Help text for options/flags.
 * @property {Record<string, string>} [env] - Help text for environment variables.
 */

/**
 * @typedef {object} CLIArgs
 * @property {ParsedCLI} [parsed] - Parsed CLI data (from argument parser).
 * @property {Array<(string|string[])>} [commands] - CLI commands or argument definitions.
 * @property {Array<(string|string[])>} [options] - CLI option/flag definitions.
 * @property {Array<[string[], string, string]>} [env] - Environment variable mappings.
 * @property {Record<string, any>} [default] - Default values for options or flags.
 * @property {CLIHelpMeta} [help] - Help configuration or raw string help text.
 */

/**
 * Builds and returns formatted help text for a CLI command.
 * Returns `false` if help is not requested and no errors occurred.
 *
 * @param {CLIArgs} args - The CLI arguments/config object.
 * @returns {string|false} The generated help text or `false` if not shown.
 */
export const maybeHelp = args => {
  const { parsed = {} } = args

  const hasCommands = args.commands && Object.entries(args.commands).length > 0
  const showCommandHelp =
    hasCommands && parsed.commands && Object.keys(parsed.commands).length === 0

  const helpRequested = parsed.args?.help

  const showHelp = showCommandHelp || helpRequested || !is.empty(parsed.errors)

  if (!showHelp) {
    return false
  }

  // add help text inspection here
  const { commands = [], default: defaults = [], options = [], env = [], help = {} } = args

  const commandHelp = argToHelp(commands, help.commands)
  const optionHelp = argToHelp(options, help.options, defaults)
  const envHelp = envToHelp(env)

  const name = help.name || '@magic/cli wrapped cli.'
  const header = is.string(help) ? help : help.text

  const exampleArray = is.string(help.example) ? help.example.split('\n') : help.example || []

  const exampleText = exampleArray
    .map(a => {
      if (a.trim().startsWith('#')) {
        return log.color('green', a)
      } else {
        return a.trim()
      }
    })
    .join('\n')

  const helpArray = [
    log.paint('green', name),
    '\n',
    header && `\n${log.paint('grey', header)}\n\n`,
    commands.length && `${log.paint('grey', 'commands')}:\n${commandHelp}\n\n`,
    options.length && `${log.paint('grey', 'flags')}:\n${optionHelp}\n\n`,
    env.length && `${log.paint('grey', 'environment switches')}:\n${envHelp}\n\n`,
    'examples:\n',
    exampleText,
  ]

  const errors = parsed.errors
    ?.map(e => `${log.paint('red', 'Error:')} ${is.arr(e) ? e.join(' or ') : e} is required`)
    .filter(a => a)
    .join('\n')

  const errorMsg = `\n${errors}`
  if (errors?.length) {
    helpArray.push(errorMsg)
  }

  return helpArray.filter(a => a).join('')
}
