const log = require('@magic/log')
const is = require('@magic/types')

const maybeHelp = ({ args, parsed }) => {
  const hasArgs = Object.values(parsed).some(a => !is.empty(a))
  const flags = ['help', 'h', '-h', '--h', '--help']
  const showHelp = !hasArgs || flags.some(a => process.argv.includes(a))

  if (showHelp) {
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

    const argToHelp = (arr, help = {}) =>
      arr.map(opt => {
        if (is.string(opt)) {
          return opt
        } else {
          const [name, ...aliases] = opt
          let res = log.paint('yellow', name)

          if (help[name]) {
            res += ` - ${help[name]}`
          }

          if (aliases.length) {
            res += ` - aliases: ["${aliases.map(a => log.paint('yellow', a)).join('", "')}"]`
          }

          res += '\n'
          return res
        }
      })

    const envToHelp = env =>
      env
        .map(e => {
          const [cmds, name, value] = e
          const [sw, ...aliases] = cmds
          const swc = log.paint('yellow', sw)
          const aliasString = aliases
            .map(a => log.paint('yellow', a))
            .join('", "')

          return `${swc}: set process.${name} to ${value} - aliases ["${aliasString}"]`
        })
        .join('\n')

    const commandHelp = argToHelp(commands, help.commands)
    const optionHelp = argToHelp(options, help.options)
    const envHelp = envToHelp(env, help.env)

    const name = help.name || '@magic/cli wrapped cli.'
    const header = is.string(help) ? help : help.text

    // const pendToHelp = pend => {
    //   if (!pend.length) {
    //     return ''
    //   }

    //   console.log({ pend })
    // }

    // const prependHelp = pendToHelp(prepend)
    // const appendHelp = pendToHelp(append)
    // const defaultHelp = defaultHelp(def)

    const helpString = `\
${log.paint('green', name)}
${header ? `\n${log.paint('grey', header)}\n\n` : ''}\
${commands.length ? `${log.paint('grey', 'commands')}:\n${commandHelp}\n` : ''}\
${options.length ? `${log.paint('grey', 'flags')}:\n${optionHelp}\n` : ''}\
${env.length ? `${log.paint('grey', 'environment switches')}:\n${envHelp}\n` : ''}\
${help.examples ? help.examples : ''}\
`
    log(helpString)

    process.exit()
  }
}

module.exports = maybeHelp