const log = require('@magic/log')
const is = require('@magic/types')

const envToHelp = require('./envToHelp')
const argToHelp = require('./argToHelp')
const pendToHelp = require('./pendToHelp')
const defaultToHelp = require('./defaultToHelp')

const maybeHelp = ({ args, parsed }) => {
  const hasArgs = Object.values(parsed).some(a => !is.empty(a))
  const flags = ['help', 'h', '-h', '--h', '--help']
  const showHelp = !hasArgs || flags.some(a => process.argv.includes(a))

  if (!showHelp) {
    return false
  }

  // add help text inspection here
  const {
    commands = [],
    options = [],
    env = [],
    default: def = [],
    prepend = [],
    append = [],
    help = '',
  } = args

  const commandHelp = argToHelp(commands, help.commands)
  const optionHelp = argToHelp(options, help.options)
  const envHelp = envToHelp(env, help.env)

  const name = help.name || '@magic/cli wrapped cli.'
  const header = is.string(help) ? help : help.text

  const prependHelp = pendToHelp(prepend, help.prepend)
  const appendHelp = pendToHelp(append, help.append)
  const defaultHelp = defaultToHelp(def, help.default)

  const helpArray = [
    log.paint('green', name),
    '\n',
    header && `\n${log.paint('grey', header)}\n\n`,
    commands.length && `${log.paint('grey', 'commands')}:\n${commandHelp}\n`,
    options.length && `${log.paint('grey', 'flags')}:\n${optionHelp}\n`,
    env.length && `${log.paint('grey', 'environment switches')}:\n${envHelp}\n`,
    prependHelp,
    appendHelp,
    defaultHelp,
    help.examples,
  ]

  return helpArray.filter(a => a).join('')
}

module.exports = maybeHelp
