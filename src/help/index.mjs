import log from '@magic/log'

import { envToHelp } from './envToHelp.mjs'
import { argToHelp } from './argToHelp.mjs'

export const maybeHelp = args => {
  const { parsed } = args
  const hasArgs = Object.values(parsed).some(a => Object.entries(a).length)
  const flags = ['help', 'h', '-h', '--h', '--help']
  const hasCommands = args.commands && Object.entries(args.commands).length > 0
  const showHelp = hasCommands && Object.keys(parsed.commands).length === 0

  const helpRequested = parsed.args.help

  if (!showHelp && !helpRequested) {
    return false
  }

  // add help text inspection here
  const { commands = [], options = [], env = [], help = '' } = args

  const commandHelp = argToHelp(commands, help.commands)
  const optionHelp = argToHelp(options, help.options)
  const envHelp = envToHelp(env, help.env)

  const name = help.name || '@magic/cli wrapped cli.'
  const header = typeof help === 'string' ? help : help.text

  const helpArray = [
    log.paint('green', name),
    '\n',
    header && `\n${log.paint('grey', header)}\n\n`,
    commands.length && `${log.paint('grey', 'commands')}:\n${commandHelp}\n\n`,
    options.length && `${log.paint('grey', 'flags')}:\n${optionHelp}\n\n`,
    env.length && `${log.paint('grey', 'environment switches')}:\n${envHelp}\n\n`,
    // prependHelp,
    // appendHelp,
    // defaultHelp,
    'examples:\n',
    help.example,
  ]

  return helpArray.filter(a => a).join('')
}
