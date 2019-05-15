import log from '@magic/log'

export const envToHelp = env =>
  env
    .map(e => {
      const [cmds, name, value] = e
      const [sw, ...aliases] = cmds
      const swc = log.paint('yellow', sw)
      const aliasString = aliases.map(a => log.paint('yellow', a)).join('", "')

      return `${swc}: set process.${name} to ${value} - alias: ["${aliasString}"]`
    })
    .join('\n')
